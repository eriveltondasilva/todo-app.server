import { PrismaClient } from "@prisma/client";

/**************************************
 * @class Seeder Abstract Class
 * @classdesc Define an abstract class called Seeder
 **/
abstract class Seeder<T> {
  protected abstract items: T[];
  protected modelName = this.constructor.name.replace('Seeder', '');

  constructor(private prisma: PrismaClient) {}

  /** @desc Asynchronously seeds the database with the provided items. **/
  async seeding(): Promise<void> {
    console.log('----------------------------------------');
    console.log('Start seeding %s Model...\n', this.modelName);

    try {
      for (const item of this.items) {
        const result = await (
          this.prisma[this.modelName.toLowerCase() as keyof PrismaClient] as any
        ).create({
          data: item,
        });
        console.log('Created %s with id: %d.', this.modelName, result.id);
      }

      console.log('\nSeeding finished for %s Model.', this.modelName);
      console.log('----------------------------------------');

      await this.prisma.$disconnect();
    } catch (error) {
      console.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n');
      console.error('Error during seeding %s Model.', this.modelName);
      console.error(error);
      console.error('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

      await this.prisma.$disconnect();
      process.exit(1);
    }
  }
}

// --------------------------
export default Seeder;
