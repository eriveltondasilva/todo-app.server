import { Prisma } from '../../../src/app/singletons/prisma';
import Seeder from './@seeder';

/**************************************
 * @class User Seeder
 * @classdesc Class for seeding user data
 */
class UserSeeder extends Seeder {
  /** @desc Array of user data to be seeded */
  override items: Prisma.UserCreateInput[] = [
    { name: 'Bobo', email: 'Bobo@prisma.io' },
    { name: 'Yewande', email: 'yewande@prisma.io' },
    { name: 'Angelique', email: 'angelique@prisma.io' },
    { name: 'Erivelton Silva', email: 'erivelton@prisma.io', role: 'ADMIN' },
  ];
}

// --------------------------
export default UserSeeder;
