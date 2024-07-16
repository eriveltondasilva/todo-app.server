import { Prisma } from '@prisma/client'

import { tasks, users } from './data'
import { Seeder } from './seeder'

const userSeeder = new Seeder('User')
const taskSeeder = new Seeder('Task')

async function main(): Promise<void> {
  await userSeeder.seed<Prisma.UserCreateInput>(users)
  await taskSeeder.seed<Prisma.TaskCreateInput>(tasks)
}
main()
