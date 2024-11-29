import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';
import { TransactionHistory } from './entities/transaction-history.entity';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(private readonly transactionHistoryService: TransactionHistoryService) {}

  // Create a new TransactionHistory
  @Post()
  create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto) {
    return this.transactionHistoryService.create(createTransactionHistoryDto);
  }

  // Retrieve all TransactionHistory entries
  @Get()
  findAll(
    @Query('transaction_type') type?: string,
    @Query('limit') limit?: number,
  ): Promise<TransactionHistory[]> {
    return this.transactionHistoryService.findAll(type, limit);
  }
  
  // Retrieve a single TransactionHistory entry by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionHistoryService.findOne(id); // Use `id` as a string
  }

  @Get('customer/:customerId')
  findByCustomerId(@Param('customerId') customerId: string) {
    return this.transactionHistoryService.findByCustomerId(customerId);
  }

}
