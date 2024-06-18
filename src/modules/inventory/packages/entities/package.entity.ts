import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ collection: 'Package' })
export class Package extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Container', required: true })
  container: Types.ObjectId;

  @Prop([{
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }])
  products: { product: Types.ObjectId, quantity: number }[];

  @Prop({ required: false ,default:""})
  description: string;

  @Prop({ required: false ,default:0})
  price: number;


}

export const PackageSchema = SchemaFactory.createForClass(Package);
