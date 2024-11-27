import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardAccount } from '../card-account/entities/card-account.entity';
import { TransferBalanceDto } from './dto/transfer-balance.dto';
import { TransactionHistoryService } from '../transaction-history/transaction-history.service'; // Import the TransactionHistoryService
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NfcManagerService {
  private readonly secretKey: string;
  
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(CardAccount.name) private cardAccountModel: Model<CardAccount>,
    private transactionHistoryService: TransactionHistoryService, // Inject the TransactionHistoryService
  ) {
    this.secretKey = this.configService.get<string>('AES_SECRET');
  }



  // Check the balance of a customer (card account)
  async checkBalance(customerId: string): Promise<number | null> {
    const cardAccount = await this.cardAccountModel.findOne({ customer_id: customerId }).exec();
    return cardAccount ? cardAccount.balance : null;
  }

  // Transfer balance between two customers
  async transferBalance(
    fromCustomerId: string,
    toCustomerId: string,
    amount: number,
  ): Promise<{ fromBalance: number; toBalance: number; status: string }> {
    const fromCardAccount = await this.cardAccountModel.findOne({ customer_id: fromCustomerId }).exec();
    const toCardAccount = await this.cardAccountModel.findOne({ customer_id: toCustomerId }).exec();

    if (!fromCardAccount || !toCardAccount) {
      return { fromBalance: 0, toBalance: 0, status: 'Card accounts not found' };
    }

    if (fromCardAccount.balance < amount) {
      return { fromBalance: fromCardAccount.balance, toBalance: toCardAccount.balance, status: 'Insufficient balance' };
    }

    const previousBalanceFrom = fromCardAccount.balance;
    const previousBalanceTo = toCardAccount.balance;

    // Perform the balance transfer
    fromCardAccount.balance -= amount;
    toCardAccount.balance += amount;

    // Save the updated card accounts
    await fromCardAccount.save();
    await toCardAccount.save();

    // Log transaction
    // await this.transactionHistoryService.create({
    //   customer_id: fromCustomerId,
    //   transaction_type: 'transfer',
    //   amount,
    //   status: 'success',
    // });

    // await this.transactionHistoryService.create({
    //   customer_id: toCustomerId,
    //   transaction_type: 'receive',
    //   amount,
    //   status: 'success',
    // });

    return {
      fromBalance: fromCardAccount.balance,
      toBalance: toCardAccount.balance,
      status: 'Transfer successful',
    };
  }

  // Payment operation from a CardAccount
  async payAmount(
    customer_id: string,
    amount: number,
  ): Promise<{ fromBalance: number; status: string }> {
    const fromCardAccount = await this.cardAccountModel.findOne({ customer_id }).exec();

    if (!fromCardAccount) {
      return { fromBalance: 0, status: 'Card accounts not found' };
    }

    if (fromCardAccount.balance < amount) {
      return { fromBalance: fromCardAccount.balance, status: 'Insufficient balance' };
    }

    const previousBalanceFrom = fromCardAccount.balance;

    // Perform the balance deduction
    fromCardAccount.balance -= amount;
    await fromCardAccount.save();

    // Log transaction
    // await this.transactionHistoryService.create({
    //   customer_id,
    //   transaction_type: 'payment',
    //   amount,
    //   // previous_balance: previousBalanceFrom,
    //   // new_balance: fromCardAccount.balance,
    //   status: 'success',
    // });

    return {
      fromBalance: fromCardAccount.balance,
      status: 'Payment successful',
    };
  }

  // Add balance to a CardAccount
  async addBalance(customerId: string, amount: number): Promise<{ newBalance: number; status: string }> {
    if (isNaN(amount)) {
      return { newBalance: 0, status: 'Invalid amount value' };
    }

    const cardAccount = await this.cardAccountModel.findOne({ customer_id: customerId }).exec();

    if (!cardAccount) {
      return { newBalance: 0, status: 'Card account not found' };
    }

    const previousBalance = cardAccount.balance;

    // Add the specified amount to the balance, even if it's 0
    cardAccount.balance += amount;

    // Ensure balance is always a number after the addition
    cardAccount.balance = Number(cardAccount.balance);

    // Save the updated card account
    await cardAccount.save();

    // Log transaction
    // await this.transactionHistoryService.create({
    //   customer_id: customerId,
    //   transaction_type: 'add',
    //   amount,
    //   status: 'success',
    // });

    return {
      newBalance: cardAccount.balance,
      status: 'Balance added successfully',
    };
  }

  // encryptData(data: object): string {
  //   const iv = crypto.randomBytes(16); // Initialization vector
  //   const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(this.secretKey), iv);
    
  //   let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  //   encrypted += cipher.final('hex');
    
  //   // Returning iv (for decryption) + encrypted data (hexadecimal string)
  //   return iv.toString('hex') + encrypted;
  // }

  async encryptData(data: any): Promise<any> {
    try {
      // Ensure the data is an object (in case a JSON string is provided)
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      // Parse the encryptedData from the input object
      const value = JSON.parse(data['encryptedData']);

      // Hash the value before encryption using MD5
      const hash = crypto.createHash('md5');
      hash.update(JSON.stringify(value));  // Hash the data
      const hashedData = hash.digest('hex');  // Get the hex representation of the hashed data

      // Add the MD5 hash as part of the object
      value['H'] = hashedData;

      // Check if 'B' property exists, if not, initialize it to 0
      if (!Object.prototype.hasOwnProperty.call(value, 'B')) {
        value['B'] = 0;
      }

      // Adjust the balance based on the action type
      if (value['A'] === 1) {
        // Action A=1 means add the issuance amount to the balance
        value['B'] += value['I'];
      } else if (value['A'] === 2) {
        // Action A=2 means subtract the issuance amount from the balance
        value['B'] -= value['I'];
      }

      console.log(value['B'])
      // Now, proceed with encryption of the data (excluding the hash part)
      const iv = crypto.randomBytes(16); // Initialization vector
      const cipher = crypto.createCipheriv('aes-128-cbc', this.secretKey, iv);

      // Encrypt the data (use the object with the hash included)
      let encrypted = cipher.update(JSON.stringify(value), 'utf8', 'hex');
      encrypted += cipher.final('hex');

      // Return the iv (for decryption) + encrypted data (in hexadecimal string form)
      const encryptedData = iv.toString('hex') + encrypted;

      // Save the encrypted data into the database
      await this.transactionHistoryService.create(value);

      // Log the hashed data (optional, for debugging)
      console.log('Hashed Data:', value['H']);

      return encryptedData;  // Returning the final encrypted data
    } catch (error) {
      console.error('Encryption failed:', error.message);
      throw new Error('Encryption error: Unable to encrypt data');
    }
  }

  decryptData(encryptedData: string): string {
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract the IV
    const encryptedText = encryptedData.slice(32);

    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(this.secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
