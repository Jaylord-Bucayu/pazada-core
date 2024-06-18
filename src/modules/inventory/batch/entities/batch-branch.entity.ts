import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class BranchQuantity extends Document {
  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
  branchId: Types.ObjectId;
}

export const BranchQuantitySchema = SchemaFactory.createForClass(BranchQuantity);
