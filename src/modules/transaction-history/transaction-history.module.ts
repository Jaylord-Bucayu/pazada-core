import { Module } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { TransactionHistoryController } from './transaction-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionHistory, TransactionHistorySchema } from './entities/transaction-history.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TransactionHistory.name, schema: TransactionHistorySchema }]),
  ],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
  exports: [TransactionHistoryService],
})
export class TransactionHistoryModule {}
