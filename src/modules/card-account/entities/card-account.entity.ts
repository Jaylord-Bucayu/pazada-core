import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class CardAccount extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  customer_id: mongoose.Types.ObjectId; // Refers to the User collection

  @Prop({ required: true })
  issuance_amount: number;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  store_id: string; // Merchant ID

  @Prop({ required: true })
  payment_amount: number;

  @Prop({ required: true })
  timestamp: string; // Can be ISO string or Unix timestamp

  @Prop({ required: true })
  hash: string; // Includes the previous hash
}

// Create the Mongoose schema
export const CardAccountSchema = SchemaFactory.createForClass(CardAccount);
