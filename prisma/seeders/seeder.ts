import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export class Seeder {
  private saltRounds = 8
  private prisma: PrismaClient = new PrismaClient()

  constructor(private modelName: string) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds)
  }

  async seed<T>(items: T[]): Promise<void> {
    try {
      console.log('----------------------------------------')
      console.log('Start seeding %s Model...\n', this.modelName)

      for (let item of items) {
        if (item['password']) {
          item['password'] = await this.hashPassword(item['password'])
        }

        const result = await this.prisma[this.modelName.toLowerCase()].create({
          data: item,
        })
        console.log('Created %s with id: %d.', this.modelName, result.id)
      }

      console.log('\nSeeding finished for %s Model.\n', this.modelName)
      this.prisma.$disconnect()
    } catch (error) {
      console.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
      console.error('Error during seeding %s Model:\n', this.modelName)
      console.error(error)
      console.error('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

      await this.prisma.$disconnect()
      process.exit(1)
    }
  }
}
