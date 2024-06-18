import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Branch' })
export class Branch extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;


}

export const BranchSchema = SchemaFactory.createForClass(Branch);
