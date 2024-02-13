import { Router } from 'express'

import TaskController from '@/controllers/task.controller'
import isAuthenticated from '@/middlewares/isAuthenticated'
import TaskModel from '@/models/task.model'
import ResponseService from '@/services/response.service'
import prisma from '@/singletons/prisma'
import taskValidation from '@/validations/task.validator'

// ------------------------------------
//# Instances
const router = Router()

const response = new ResponseService()
const taskModel = new TaskModel(prisma)
const taskController = new TaskController(response, taskModel)

// ------------------------------------
//# Middlewares
router.use('*', isAuthenticated)

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
