import { Router } from 'express'

import ControllerFactory from '@/factories/controllerFactory'
import TaskController from '@/controllers/task'
import TaskModel from '@/models/task'

// ------------------------------------
//# Instances
const router = Router()

// ------------------------------------
//# Todo Controller Methods
const taskController = ControllerFactory.create(TaskController, TaskModel)
const { index, show, create, update, destroy, destroyMany } = taskController

// ------------------------------------
//# Middlewares
// router.use()

// ------------------------------------
//# Todo Routes

// prettier-ignore
router.route('/tasks')
    .get(index)
    .post(create)
    .delete(destroyMany)

// prettier-ignore
router.route('/tasks/:id')
    .get(show)
    .put(update)
    .delete(destroy)

// ------------------------------------
export default router
