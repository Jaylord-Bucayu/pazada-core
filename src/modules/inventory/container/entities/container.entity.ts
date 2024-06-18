import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ collection: 'Container' })
export class Container extends Document {

 @Prop({ required: true })
 name: string;

 @Prop({ required: false })
 photo: string;

  @Prop({ required: false,default:0 })
  length: number;

  @Prop({ required: false,default:0 })
  width: number;

  @Prop({ required: false,default:0 })
  height: number;

  @Prop({ required: false,default:0 })
  weightLimit: number;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  unit: string;

}

export const ContainerSchema = SchemaFactory.createForClass(Container);