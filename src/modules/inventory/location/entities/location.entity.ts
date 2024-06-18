import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";




@Schema({ collection: 'InventoryLocation' })
export class Location extends Document {

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false,default:"" })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Address', required: true })
  address: Types.ObjectId;

}


export const LocationSchema = SchemaFactory.createForClass(Location);