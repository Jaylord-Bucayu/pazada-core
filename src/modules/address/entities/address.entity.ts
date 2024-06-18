import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: 'Address' })
export class Address extends Document{

    @Prop({ required: false,default:"" })
    address: string;

    @Prop({ required: false,default:"" })
    street: string;

    @Prop({ required: false,default:"" })
    country: string;

    @Prop({ required: false,default:"" })
    city: string;

    @Prop({ required: false,default:"" })
    province: string;

    @Prop({ required: false,default:0})
    zipcode: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address)