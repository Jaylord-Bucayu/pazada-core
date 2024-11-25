import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the schema for TransactionHistory
@Schema({ timestamps: true })
export class TransactionHistory extends Document {
  @Prop({ required: true, type: Number })
  C: number;  // Example: 123

  @Prop({ required: true, type: Number })
  I: number;  // Example: 100

  @Prop({ required: false, type: Number, default:0 })
  B: number;  // Example: 100

  @Prop({ required: true, type: Number })
  S: number;  // Example: 543

  @Prop({ required: true, type: Number })
  P: number;  // Example: 0

  @Prop({ required: true, type: Number })
  T: number;  // Example: 1731583838 (timestamp)

  @Prop({ required: true, type: Number })
  A: number;  // Example: 1

  @Prop({ required: true })
  H: string;  // Example: '08b5d41b0a01ec8fe5dc03b61ed438ee'
}

// Create the schema for Mongoose
export const TransactionHistorySchema = SchemaFactory.createForClass(TransactionHistory);
