import { Router } from 'express'

import TaskController from '@/controllers/taskController'
import validateToken from '@/middlewares/validateToken'
import TaskModel from '@/models/taskModel'
import ResponseService from '@/services/response'
import prisma from '@/singletons/prisma'

// ------------------------------------
//# Instances
const router = Router()

const response = new ResponseService()
const taskModel = new TaskModel(prisma)
const taskController = new TaskController(response, taskModel)

// ------------------------------------
//# Todo Controller Methods
// prettier-ignore
const {
    index,
    show,
    create,
    update,
    destroy,
    destroyMany
} = taskController

// ------------------------------------
//# Middlewares
router.use(validateToken)

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
