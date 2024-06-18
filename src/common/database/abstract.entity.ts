import { Document, Schema, Types } from 'mongoose';

export class AbstractEntity<T extends Document> {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}

export const AbstractSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
