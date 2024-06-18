import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Business extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      province: { type: String, required: true },
      postal_code: { type: String, required: true },
    },
    required: true,
  })
  address: {
    city: string;
    street: string;
    province: string;
    postal_code: string;
  };

  @Prop({ required: true })
  email: string;

  @Prop({
    type: {
      prefix: { type: String, default: '' },
      number: { type: String, default: '' },
    },
    required: true,
  })
  phone: {
    prefix: string;
    number: number;
  };

  @Prop({ default: '' })
  website: string;

  @Prop({ default: '' })
  logo: string;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
