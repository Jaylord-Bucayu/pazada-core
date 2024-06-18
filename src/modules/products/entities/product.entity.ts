import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { AbstractSchema } from 'src/common/database/abstract.entity';

@Schema({ collection: 'Product' })
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0.00 })
    price: number;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ required: true })
    description: string;

    @Prop({ default: [] })
    images: string[];

    @Prop({ default: 0 })
    creditPrice: number;

    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product).add(AbstractSchema);
