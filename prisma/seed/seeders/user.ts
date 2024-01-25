import { Prisma, Role } from '@prisma/client'
import Seeder from './@seeder'

/**************************************
 * @class User Seeder
 * @classdesc Class for seeding user data
 **/
class UserSeeder extends Seeder<Prisma.UserCreateInput> {
  /** @desc Array of user data to be seeded **/
  items = [
    { name: 'Bobo', email: 'Bobo@prisma.io' },
    { name: 'Yewande', email: 'yewande@prisma.io' },
    { name: 'Angelique', email: 'angelique@prisma.io' },
    { name: 'Erivelton Silva', email: 'erivelton@prisma.io', Role: Role.ADMIN },
  ]
}

// --------------------------
export default UserSeeder
