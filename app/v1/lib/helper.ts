import { UnknownInterface } from './unknown.interface';
import { Types } from 'mongoose';

const { ObjectId } = Types;

const Helper = {
  validObjectId(id: UnknownInterface) {
    return ObjectId.isValid(id);
  },
};
export default Helper;
