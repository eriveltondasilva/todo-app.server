import { Router } from 'express'

import TaskController from '@/controllers/taskController'
import taskValidation from '@/middlewares/validations/taskValidation'
import verifyToken from '@/middlewares/verifyToken'
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
//# Middlewares
router.use(verifyToken)

// ------------------------------------
//# Todo Routes

router
  .route('/tasks')
  .get(taskController.index)
  .post(taskValidation.create, taskController.create)
  .delete(taskValidation.destroyMany, taskController.destroyMany)

router
  .route('/tasks/:id')
  .get(taskValidation.show, taskController.show)
  .put(taskValidation.update, taskController.update)
  .delete(taskValidation.destroy, taskController.destroy)

// ------------------------------------
export default router
