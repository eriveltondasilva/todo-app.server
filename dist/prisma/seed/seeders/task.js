"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _seeder_1 = __importDefault(require("./@seeder"));
/**************************************
 * @class Task Seeder
 * @classdesc Class for seeding task data
 **/
class TaskSeeder extends _seeder_1.default {
    constructor() {
        super(...arguments);
        /** @desc Array of task data to be seeded **/
        this.items = [
            { title: 'Criado por Erivelton Silva', is_completed: true },
            { title: 'Estudar Novo Framework JavaScript' },
            { title: 'Aprimorar Habilidades de Teste' },
            { title: 'Contribuir para Projetos Open Source' },
            { title: 'Explorar Tecnologias de Containerização' },
            { title: 'Desenvolver um Projeto Pessoal' },
        ];
    }
}
// --------------------------
exports.default = TaskSeeder;
