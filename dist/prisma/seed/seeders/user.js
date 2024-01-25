"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const _seeder_1 = __importDefault(require("./@seeder"));
/**************************************
 * @class User Seeder
 * @classdesc Class for seeding user data
 **/
class UserSeeder extends _seeder_1.default {
    constructor() {
        super(...arguments);
        /** @desc Array of user data to be seeded **/
        this.items = [
            { name: 'Bobo', email: 'Bobo@prisma.io' },
            { name: 'Yewande', email: 'yewande@prisma.io' },
            { name: 'Angelique', email: 'angelique@prisma.io' },
            { name: 'Erivelton Silva', email: 'erivelton@prisma.io', Role: client_1.Role.ADMIN },
        ];
    }
}
// --------------------------
exports.default = UserSeeder;
