import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'User',timestamps: true })
export class User extends Document {
  
  @Exclude()
  @Prop({ type: String,required:true })
  password: string;

  @Prop({ type: String })
  customer_code: string;

  @Prop({ type: Date })
  date_of_birth: Date;

  @Prop({ type: Number })
  credit_limit: number;

  @Prop({ type: Number })
  credit_left: number;

  @Prop({ type: String })
  firstname: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  middlename: string;

  @Prop({ type: String })
  lastname: string;

  @Prop({ type: String, unique: true ,required:true})
  email: string;

  @Prop({ type: Number, unique: true })
  phone: number;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: Number })
  postal_code: number;

  @Prop({ type: String })
  region: string;

  @Prop({ type: String })
  provider: string;


  @Prop({ default:true })
  isActive: boolean;

  @Prop({ default:0 })
  staged: number;


  @Expose()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @Prop({ type: Types.ObjectId, ref: 'Department' }) // Reference to Department schema
  department: Types.ObjectId;

  @Prop({ type: String }) // Role within the department
  departmentRole: string;

  @Prop({ type: String,default:"merchant" }) // Role within the company (if needed)
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
