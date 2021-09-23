import Model from '../entity/user.model';
import { IUser } from '../interface/user.interface';

class UserService {
  public static createUser = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      return await Model.create(data);
    } catch (e) {
      return e;
    }
  };

  public static async saveUser(data: IUser) {
    try {
      return await data.save();
    } catch (e) {
      return e;
    }
  }

  public static async findUser(data: { email?: string; _id?: string }) {
    try {
      return await Model.findOne(data);
    } catch (e) {
      return e;
    }
  }
}
export default UserService;
