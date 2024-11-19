import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { TransactionHistory } from './entities/transaction-history.entity';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory.name)
    private readonly transactionHistoryModel: Model<TransactionHistory>,
  ) {}

  // Create a new transaction
  async create(createTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    const transaction = new this.transactionHistoryModel(createTransactionHistoryDto);
    return transaction.save();
  }

  // Get all transactions
  async findAll(transaction_type?: string): Promise<TransactionHistory[]> {
    if (transaction_type) {
      // Filter by type if provided
      return this.transactionHistoryModel.find({ transaction_type }).exec();
    } else {
      // Otherwise, return all records
      return this.transactionHistoryModel.find().exec();
    }
  }

  // Find a transaction by ID
  async findOne(id: string): Promise<TransactionHistory | null> {
    return this.transactionHistoryModel.findById(id).exec();
  }


  // New method to find transactions by customer_id
  async findByCustomerId(customerId: string): Promise<TransactionHistory[]> {
    return this.transactionHistoryModel.find({ customer_id: customerId }).exec();
  }
}
