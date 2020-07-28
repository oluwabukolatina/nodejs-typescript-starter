import { Schema, model } from 'mongoose';
import { IDummy } from './dummy.interface';

const DummySchema = new Schema(
  {
    dummy: String,
  },
  { timestamps: true },
);

export default model<IDummy>('Dummy', DummySchema);
