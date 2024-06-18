import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Debit extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Invoice', required: true })
  invoice: Types.ObjectId;

  @Prop({ required: true, default: new Date() })
  date: Date;
}

export const DebitSchema = SchemaFactory.createForClass(Debit);
