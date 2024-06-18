import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Sale', timestamps: true })
export class Sale extends Document {
  @Prop([
    { product: { type: Types.ObjectId, ref: 'Product' }, quantity: Number, totalPrice:Number },
  ])
  products: { product: Types.ObjectId; quantity: number,totalPrice:number }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  subTotalPrice: number;

  @Prop({ required: true })
  creditDeduction: number;

  @Prop({ required: true })
  change: number;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  customer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  salesPerson: Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: 0 })
  discount_entire_sale: number;

  @Prop({ default: 0 })
  discount_percent_sale: number;

  @Prop({ default: 0 })
  tax: number;


  @Prop({ default: 0 })
  number_of_items_sold: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
