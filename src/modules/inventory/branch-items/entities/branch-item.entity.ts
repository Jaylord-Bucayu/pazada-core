import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({collection:"BranchItems"})
export class BranchItem extends Document{

    @Prop({ type: Types.ObjectId, ref: 'Branch',required:true })
    branch: Types.ObjectId; // Reference to multiple User entities
    
    @Prop({ type: Types.ObjectId, ref: 'Product',required:true })
    item: Types.ObjectId; // Reference to multiple User entities

    @Prop({ required: true, default: 0 })
    quantity: number;

    @Prop({ required: true, default: 0 })
    cost: number;

    @Prop({ required: true, default: 0 })
    srp: number;
    
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Batch' }], required: true })
    batch: Types.ObjectId[];
}


export const BranchItemSchema = SchemaFactory.createForClass(BranchItem);

