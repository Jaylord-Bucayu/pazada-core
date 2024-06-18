import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AbstractSchema } from '../../../common/database/abstract.entity';

@Schema({ collection: 'Category' })
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: "No Description" })
  description: string;

  @Prop({ required: true })
  code: string;

  // This method should be called elsewhere, not in the schema definition
  generateCategoryCode(): string {
    // Customize this code generation logic as needed
    return 'CAT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

export const CategorySchema = SchemaFactory.createForClass(Category).add(AbstractSchema);
