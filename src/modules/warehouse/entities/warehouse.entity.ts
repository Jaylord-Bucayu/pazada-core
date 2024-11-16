import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Warehouses' })
export class Warehouse extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true,ref:'Address' })
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'LocationItem' }], default: [] })
  locationItems: Types.ObjectId[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
