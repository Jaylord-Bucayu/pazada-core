import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { AbstractSchema } from 'src/common/database/abstract.entity';

@Schema({ collection: 'Product' })
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0.00 })
    price: number;

    @Prop({ default: 0.00 })
    cost: number;

    @Prop({ default: 0 })
    reOrderPoint: number;

    @Prop({ default: 0 })
    creditPrice: number;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ required: false,default:"" })
    description: string;

    @Prop({ default: [] })
    images: string[];

    @Prop({ type: Types.ObjectId, ref: 'Location', required: false })
    inventoryLocation: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Types.ObjectId;

    @Prop({ required:false,default:"" })
    sku: string;

    @Prop({ required: false,default:"" })
    receiptAlias: string;

    @Prop({ required: false,default:"" })
    barcode: string;

    @Prop({ required: false,default:"" })
    unit: string;

    @Prop({ required: false,default:0 })
    stock: string;
}


export const ProductSchema = SchemaFactory.createForClass(Product).add(AbstractSchema);
