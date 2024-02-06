import type { IModel } from '@/models/@model'
import type { IResponse } from '@/services/response'
import type { AuthRequest } from '@/types/authRequest'
import type { Prisma } from '@prisma/client'
import type { Response } from 'express'

import { validationResult } from 'express-validator'
import Controller from './@controller'

// ====================================
/** @class Task Controller Class */
class TaskController extends Controller {
  constructor(
    protected response: IResponse,
    protected model: IModel,
  ) {
    super(response)
  }

  //# TO-DO CONTROLLER METHODS
  // --------------------------
  //* Retrieve all task items
  async index(req: AuthRequest, res: Response): Promise<void> {
    try {
      const authUserId = Number(req.user?.id || 1)

      const tasks = await this.model.findAll(authUserId)

      return this.response.ok(res, tasks)
    } catch (error) {
      console.error(error)
    }
  }

  //* Find a task by its ID
  async show(req: AuthRequest, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const authUserId = Number(req.user?.id || 1)
    const message = { error: 'Task not found' }

    try {
      const task = await this.model.findById(id, authUserId)
      return this.response.ok(res, task)
    } catch (error) {
      console.error(error)
      return this.response.notFound(res, message)
    }
  }

  //* Create a new task item
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const body = req.body
      const authUserId = Number(req.user?.id || 1)

      const result = validationResult(req)

      if (!result.isEmpty()) {
        return this.response.badRequest(res, { message: result.array()[0].msg })
      }

      const task = await this.model.create<Prisma.TaskCreateInput>(body, authUserId)
      return this.response.created(res, task)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, { message: 'Task not created' })
    }
  }

  //* Update a task item
  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id)
      const authUserId = Number(req.user?.id || 1)
      const body = req.body
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return this.response.badRequest(res, { message: result.array()[0].msg })
      }

      const task = await this.model.update<Prisma.TaskUpdateInput>(id, body, authUserId)
      return this.response.ok(res, task)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, { message: 'Task not updated' })
    }
  }

  //* Delete a task item.
  async destroy(req: AuthRequest, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const authUserId = Number(req.user?.id || 1)
    const message = { error: 'Task not deleted' }

    try {
      await this.model.deleteById(id, authUserId)
      return this.response.noContent(res)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, message)
    }
  }

  //* Delete a task item.
  async destroyMany(req: AuthRequest, res: Response): Promise<void> {
    const taskIds: number[] = req.body.ids
    const authUserId = Number(req.user?.id || 1)
    const message = { error: 'Tasks not deleted' }

    try {
      await this.model.destroyManyById(taskIds, authUserId)
      return this.response.noContent(res)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, message)
    }
  }
}

// --------------------------
export default TaskController
