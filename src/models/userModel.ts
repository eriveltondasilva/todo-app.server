import Model, { IModel } from './@model'

// interface
export interface IUserModel extends IModel {
  findByEmail(userEmail: string): Promise<any>
}

// ====================================
/** @desc User Model Class */
class UserModel extends Model implements IUserModel {
  async findByEmail(userEmail: string): Promise<any> {
    return await this.model.user.findUnique({
      where: {
        email: userEmail,
      },
    })
  }
}

// --------------------------
export default UserModel
