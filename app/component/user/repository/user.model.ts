import { model, Schema } from 'mongoose';
import { UserDocument } from './user.document';
import { UserModelInterface } from '../interface/user-model.interface';

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = model<UserDocument, UserModelInterface>('User', UserSchema);

export default UserModel;
