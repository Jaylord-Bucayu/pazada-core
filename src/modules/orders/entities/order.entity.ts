import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

@Schema({ timestamps: true })
export class Order extends AbstractEntity<OrderDocument> {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop({ required: true })
  payment: string;

  @Prop()
  creditDeduction: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  products: Types.ObjectId[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' })
  status: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);

// Pre-save hook to generate orderNumber
OrderSchema.pre<OrderDocument>('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});
