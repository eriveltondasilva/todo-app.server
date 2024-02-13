import BaseModel, { IBaseModel } from './base.model'

// interface
export interface IUserModel extends IBaseModel {
  findByEmail(userEmail: string): Promise<any>
}

// ====================================
/** @desc User Model Class */
class UserModel extends BaseModel implements IUserModel {
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
