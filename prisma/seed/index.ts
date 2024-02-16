import { PrismaClient } from '@prisma/client'

import TaskSeeder from './seeders/task.seeder'
import UserSeeder from './seeders/user.seeder'

// ----------------------------
const prisma = new PrismaClient()
const userSeeder = new UserSeeder(prisma)
const taskSeeder = new TaskSeeder(prisma)

// --------------------------
class Seed {
  static async run(): Promise<void> {
    await userSeeder.seeding()
    await taskSeeder.seeding()
  }
}

// --------------------------
Seed.run()
