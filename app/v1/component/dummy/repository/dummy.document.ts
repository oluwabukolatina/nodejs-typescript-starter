import { Document, Types } from 'mongoose';

export interface DummyDocument extends Document {
  _id: Types.ObjectId;
  name: string;
}
