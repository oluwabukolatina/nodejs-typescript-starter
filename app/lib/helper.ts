import { Types } from 'mongoose';
import { UnknownInterface } from './unknown.interface';

const { ObjectId } = Types;

const Helper = {
  validObjectId(id: UnknownInterface) {
    return ObjectId.isValid(id);
  },
  upperCase(string: string) {
    return string.trim().toUpperCase();
  },
};
export default Helper;
