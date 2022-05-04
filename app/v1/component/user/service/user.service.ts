import Model from '../entity/user.model';

class UserService {
  public static createUser = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      return Model.create(data);
    } catch (e) {
      return e;
    }
  };

  public static async findUser(data: { email?: string; _id?: string }) {
    try {
      return Model.findOne(data);
    } catch (e) {
      return e;
    }
  }
}
export default UserService;
