import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tax extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  percent: number;

  @Prop({ required: true })
  taxName: string;

  @Prop({ default:false })
  cumulative: boolean;

}

export const TaxSchema = SchemaFactory.createForClass(Tax);
