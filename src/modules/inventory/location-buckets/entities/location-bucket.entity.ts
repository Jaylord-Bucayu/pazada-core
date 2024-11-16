import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema({ collection: 'LocationBucket',timestamps:true })
export class LocationBucket extends Document {

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: false,default:"" })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
    location: Types.ObjectId;

}


export const LocationBucketSchema = SchemaFactory.createForClass(LocationBucket);