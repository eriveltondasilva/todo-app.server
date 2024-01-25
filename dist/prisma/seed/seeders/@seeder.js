"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**************************************
 * @class Seeder Abstract Class
 * @classdesc Define an abstract class called Seeder
 **/
class Seeder {
    constructor(prisma) {
        this.prisma = prisma;
        this.modelName = this.constructor.name.replace('Seeder', '');
    }
    /** @desc Asynchronously seeds the database with the provided items. **/
    seeding() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('----------------------------------------');
            console.log('Start seeding %s Model...\n', this.modelName);
            try {
                for (const item of this.items) {
                    const result = yield this.prisma[this.modelName.toLowerCase()].create({
                        data: item,
                    });
                    console.log('Created %s with id: %d.', this.modelName, result.id);
                }
                console.log('\nSeeding finished for %s Model.', this.modelName);
                console.log('----------------------------------------');
                yield this.prisma.$disconnect();
            }
            catch (error) {
                console.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n');
                console.error('Error during seeding %s Model.', this.modelName);
                console.error(error);
                console.error('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                yield this.prisma.$disconnect();
                process.exit(1);
            }
        });
    }
}
// --------------------------
exports.default = Seeder;
