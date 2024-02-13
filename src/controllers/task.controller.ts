import type { IBaseModel } from '@/models/base.model'
import type { IResponse } from '@/services/response.service'
import type { AuthRequest } from '@/types/authRequest'
import type { Prisma } from '@prisma/client'
import type { NextFunction, Response } from 'express'

import BaseController from './base.controller'

// ====================================
/** @desc Task Controller Class */
class TaskController extends BaseController {
  constructor(
    protected response: IResponse,
    protected model: IBaseModel,
  ) {
    super(response)
  }

  //# TO-DO CONTROLLER METHODS
  // --------------------------
  //* Retrieve all task items
  async index(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const authUserId = Number(req.user.id)

    try {
      const tasks = await this.model.findAll(authUserId)
      return this.response.ok(res, tasks)
    } catch (error) {
      next(error)
    }
  }

  //* Find a task by its ID
  async show(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const id = Number(req.params.id)
    const authUserId = Number(req.user.id)

    try {
      const task = await this.model.findById(id, authUserId)
      return this.response.ok(res, task)
    } catch (error) {
      next(error)
    }
  }

  //* Create a new task item
  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const authUserId = Number(req.user.id)
    const body = req.body

    // Convert boolean string to boolean
    body.is_completed = body.is_completed === 'true'

    try {
      const task = await this.model.create<Prisma.TaskCreateInput>(body, authUserId)
      return this.response.created(res, task)
    } catch (error) {
      next(error)
    }
  }

  //* Update a task item
  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const id = Number(req.params.id)
    const authUserId = Number(req.user.id)
    const body = req.body

    // Convert boolean string to boolean
    body.is_completed = body.is_completed === 'true'

    try {
      const task = await this.model.update<Prisma.TaskUpdateInput>(id, body, authUserId)
      return this.response.ok(res, task)
    } catch (error) {
      next(error)
    }
  }

  //* Delete a task item.
  async destroy(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    const id = Number(req.params.id)
    const authUserId = Number(req.user.id)

    try {
      await this.model.deleteById(id, authUserId)
      return this.response.noContent(res)
    } catch (error) {
      next(error)
    }
  }

  //* Delete a task item.
  async destroyMany(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const authUserId = Number(req.user.id)
      const taskIds: number[] = req.body.ids.map((id: any) => {
        const taskId = Number(id)
        if (isNaN(taskId) || taskId <= 0) throw new Error('Invalid task ID')
        return taskId
      })

      await this.model.destroyManyById(taskIds, authUserId)
      return this.response.noContent(res)
    } catch (error) {
      next(error)
    }
  }
}

// --------------------------
export default TaskController
