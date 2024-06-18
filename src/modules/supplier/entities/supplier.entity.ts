import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ collection: 'Supplier' })
export class Supplier extends Document{
    @Prop({required:true})
    businessName:string;

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    phone:string;

    @Prop({ type: Types.ObjectId, ref: 'Address' })
    address: Types.ObjectId;

  
  }
  
  export const SupplierSchema = SchemaFactory.createForClass(Supplier);
  