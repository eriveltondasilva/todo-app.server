import { Router } from 'express'

import TaskController from '@/controllers/task.controller'
import isAuthenticated from '@/middlewares/is.authenticated.mw'
import TaskModel from '@/models/task.model'
import ResponseService from '@/services/response.service'
import prisma from '@/singletons/prisma.singleton'
import taskValidation from '@/validations/task.validator'

// ------------------------------------
//# Instances
const router = Router()

const response = new ResponseService()
const taskModel = new TaskModel(prisma)
const taskController = new TaskController(response, taskModel)

const {
  createValidation,
  showValidation,
  updateValidation,
  destroyValidation,
  destroyManyValidation,
} = taskValidation

// ------------------------------------
//# Middlewares
router.use('*', isAuthenticated)

// ------------------------------------
//# Todo Routes

router.param('id', taskController.params)

router
  .route('/tasks')
  .get(taskController.index)
  .post(createValidation, taskController.create)
  .delete(destroyManyValidation, taskController.destroyMany)

router
  .route('/tasks/:id')
  .get(showValidation, taskController.show)
  .put(updateValidation, taskController.update)
  .delete(destroyValidation, taskController.destroy)

// ------------------------------------
export default router
