import { Model } from 'mongoose';
import { DummyDocument } from '../repository/dummy.document';
import { DummyInterface } from './dummy.interface';

export interface DummyModelInterface extends Model<DummyDocument> {
  build(attr: DummyInterface): DummyDocument;
}
