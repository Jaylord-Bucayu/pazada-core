import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BranchQuantity, BranchQuantitySchema } from './batch-branch.entity';
import { LocationQuantity, LocationQuantitySchema } from './batch-location.entity';

@Schema({ collection: 'InventoryBatch' })
export class Batch extends Document {
  @Prop({ required: true })
  name: string;
  
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  item: Types.ObjectId;

  @Prop({ required: false, default: '' })
  supplier: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true, default: 0 })
  unit: string;

  @Prop({ required: true, default: 0 })
  cost: number;

  @Prop({ required: true, default: 0 })
  total: number;

  @Prop({ required: false, default: new Date() })
  mfg: Date;

  @Prop({ required: false, default: new Date() })
  exp: Date;

  @Prop({ required: false, default: [] })
  documents: string[];

  @Prop([{ type: BranchQuantitySchema, default: [] }])
  branch: BranchQuantity[]  = [];

  @Prop([{ type: LocationQuantitySchema, default:[]  }])
  location: LocationQuantity[] = [];

}

export const BatchSchema = SchemaFactory.createForClass(Batch);
