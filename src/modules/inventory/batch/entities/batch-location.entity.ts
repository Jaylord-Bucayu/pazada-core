import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class LocationQuantity extends Document {
  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'InventoryLocation', required: true })
  locationId: Types.ObjectId;
}

export const LocationQuantitySchema = SchemaFactory.createForClass(LocationQuantity);
