import type { IModel } from '@/types/model'
import type { IResponse } from '@/types/response'
import type { Prisma } from '@prisma/client'
import type { Request, Response } from 'express'

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
  async index(_: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.model?.findAll()
      return this.response.ok(res, tasks)
    } catch (error) {
      console.error(error)
    }
  }

  //* Find a task by its ID
  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const message = { error: 'Task not found' }

    try {
      const task = await this.model?.findById(Number(id))
      return this.response.ok(res, task)
    } catch (error) {
      console.error(error)
      return this.response.notFound(res, message)
    }
  }

  //* Create a new task item
  async create(req: Request, res: Response): Promise<void> {
    const body = req.body
    const message = { error: 'Task not created' }

    try {
      const task = await this.model?.create<Prisma.TaskCreateInput>(body)
      return this.response.created(res, task)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, message)
    }
  }

  //* Update a task item
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const body = req.body
    const message = { error: 'Task not updated' }

    try {
      const task = await this.model?.update<Prisma.TaskUpdateInput>(Number(id), body)
      return this.response.ok(res, task)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, message)
    }
  }

  //* Delete a task item.
  async destroy(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const message = { error: 'Task not deleted' }

    try {
      await this.model?.deleteById(Number(id))
      return this.response.noContent(res)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, message)
    }
  }

  //* Delete a task item.
  async destroyMany(req: Request, res: Response): Promise<void> {
    const ids: number[] = req.body.ids
    const message = { error: 'Tasks not deleted' }

    try {
      await this.model?.destroyManyById(ids)
      return this.response.noContent(res)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, message)
    }
  }
}

// --------------------------
export default TaskController
