import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


interface ActionDescription {
  [action: string]: string;
}

@Schema({ collection: 'Department',timestamps: true })
export class Department extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: "No description indicated" })
  description: string;

  
  @Prop({ default: true })
  isActive: boolean;


  @Prop({ type: Object })
  roles: RoleWithActions[];

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  employees: Types.ObjectId[]; // Reference to multiple User entities

 
}

export interface RoleWithActions {
  name: string;
  actions: ActionDescription;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
