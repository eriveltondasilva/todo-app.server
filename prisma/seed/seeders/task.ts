import { Prisma } from '../../../src/app/singletons/prisma'
import Seeder from './@seeder'

/**************************************
 * @class Task Seeder
 * @classdesc Class for seeding task data
 */
class TaskSeeder extends Seeder {
  /** @desc Array of task data to be seeded */
  override items: Prisma.TaskCreateInput[] = [
    { title: 'Criado por Erivelton Silva', is_completed: true },
    { title: 'Estudar Novo Framework JavaScript' },
    { title: 'Aprimorar Habilidades de Teste' },
    { title: 'Contribuir para Projetos Open Source' },
    { title: 'Explorar Tecnologias de Containerização' },
    { title: 'Desenvolver um Projeto Pessoal' },
  ]
}

// --------------------------
export default TaskSeeder