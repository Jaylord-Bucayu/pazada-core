import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardAccount } from '../card-account/entities/card-account.entity';
import { TransferBalanceDto } from './dto/transfer-balance.dto';
import { TransactionHistoryService } from '../transaction-history/transaction-history.service'; // Import the TransactionHistoryService
import * as crypto from 'crypto';

@Injectable()
export class NfcManagerService {
  constructor(
    @InjectModel(CardAccount.name) private cardAccountModel: Model<CardAccount>,
    private transactionHistoryService: TransactionHistoryService, // Inject the TransactionHistoryService
  ) {}


  private readonly secretKey = 'your-128-bit-key'; // 128-bit key (16 characters)

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
    await this.transactionHistoryService.create({
      customer_id: fromCustomerId,
      transaction_type: 'transfer',
      amount,
      status: 'success',
    });

    await this.transactionHistoryService.create({
      customer_id: toCustomerId,
      transaction_type: 'receive',
      amount,
      status: 'success',
    });

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
    await this.transactionHistoryService.create({
      customer_id,
      transaction_type: 'payment',
      amount,
      // previous_balance: previousBalanceFrom,
      // new_balance: fromCardAccount.balance,
      status: 'success',
    });

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
    await this.transactionHistoryService.create({
      customer_id: customerId,
      transaction_type: 'add',
      amount,
      status: 'success',
    });

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

  encryptData(data: any): string {
    // Ensure the data is an object (in case a JSON string is provided)
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    
    const value = JSON.parse(data["encryptedData"]);;
    
    // Extract and add "I" to "B"
    if (value.hasOwnProperty('I') && value.hasOwnProperty('B')) {
      const iValue = parseFloat(value['I']);
      const bValue = parseFloat(value['B']);
      value['B'] = bValue + iValue;
     
    }
    
    console.log(value)
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(this.secretKey), iv);
    
    let encrypted = cipher.update(JSON.stringify(value), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Returning iv (for decryption) + encrypted data (hexadecimal string)
    return iv.toString('hex') + encrypted;
  }
  

  decryptData(encryptedData: string): object {
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract the IV
    const encryptedText = encryptedData.slice(32);

    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(this.secretKey), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }
}
