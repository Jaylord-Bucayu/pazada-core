import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  customer: Types.ObjectId;

  @Prop({ required: true, default: new Date() })
  dueDate: Date;

  @Prop({ default: false })
  paid: boolean;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
