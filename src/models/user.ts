import type { IUserModel } from '@app/types/model'
import { PrismaClient } from '@prisma/client'

import Model from './@model'

/** --------------------------
 * @class User Model Class
 * @desc description
 */
class UserModel extends Model implements IUserModel {
  //# TO-DO MODEL METHODS
  // --------------------------

  async findByEmail(email: string): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).findUnique({
      where: {
        email,
      },
    })
  }
}

// --------------------------
export default UserModel
