import { IUserModel } from '@/types/model'
import Model from './@model'

// ====================================
/** @class User Model Class */
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
