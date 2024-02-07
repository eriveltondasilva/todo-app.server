import { Prisma } from '@prisma/client'
import Seeder from './@seeder'

/**************************************
 * @class User Seeder
 * @classdesc Class for seeding user data
 **/
class UserSeeder extends Seeder<Prisma.UserCreateInput> {
  /** @desc Array of user data to be seeded **/
  items = [
    { name: 'Bobo', email: 'bobo@prisma.io', password: '12345678' },
    { name: 'Yewande', email: 'yewande@prisma.io', password: '12345678' },
    { name: 'Angelique', email: 'angelique@prisma.io', password: '12345678' },
    { name: 'Erivelton Silva', email: 'erivelton@prisma.io', password: '12345678', is_admin: true },
  ]
}

// --------------------------
export default UserSeeder
