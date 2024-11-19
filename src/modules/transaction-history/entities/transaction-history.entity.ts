import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the schema for TransactionHistory
@Schema({ timestamps: true })
export class TransactionHistory extends Document {
  @Prop({ required: true })
  customer_id: string;

  @Prop({ required: true })
  transaction_type: string; // e.g., "transfer", "add_balance"

  @Prop({ required: true, type: Number })
  amount: number;

//   @Prop({ required: true, type: Number })
//   previous_balance: number;

//   @Prop({ required: true, type: Number })
//   new_balance: number;

  @Prop({ required: true })
  status: string; // e.g., "success", "failed"

  @Prop({ default: Date.now })
  timestamp: Date;
}

// Create the schema for Mongoose
export const TransactionHistorySchema = SchemaFactory.createForClass(TransactionHistory);
