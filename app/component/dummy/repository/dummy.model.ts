import { model, Schema } from 'mongoose';
import { DummyDocument } from './dummy.document';
import { DummyModelInterface } from '../interface/dummy-model.interface';

const DummySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true },
);
const DummyModel = model<DummyDocument, DummyModelInterface>(
  'Dummy',
  DummySchema,
);

export default DummyModel;
