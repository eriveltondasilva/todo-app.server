import type { IModel } from '@/types/model'
import { PrismaClient } from '@prisma/client'

// ====================================
/** @class Base Model class */
abstract class Model implements IModel {
  protected modelName: string = this.constructor.name.toLowerCase().replace('model', '')

  constructor(protected model: PrismaClient) {}

  //# BASE MODEL METHODS
  // --------------------------
  //* Retrieves all model's items from the database.
  async findAll(authUserId: number): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).findMany({
      where: {
        user_id: authUserId,
      },
    })
  }

  //* Find a item by its ID
  async findById(id: number, authUserId: number): Promise<any> {
    if (isNaN(id) || id <= 0) throw new Error(`Invalid ${this.modelName} ID`)

    const item = await (this.model[this.modelName as keyof PrismaClient] as any).findUnique({
      where: {
        id,
        user_id: authUserId,
      },
    })

    if (!item) throw new Error(`${this.modelName} not found`)

    return item
  }

  //* Create a new item
  async create<T>(data: T, authUserId?: number): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).create({
      data: {
        ...data,
        user_id: authUserId,
      },
    })
  }

  //* Update a item
  async update<T>(id: number, data: T, authUserId: number): Promise<any> {
    if (isNaN(id) || id <= 0) throw new Error(`Invalid ${this.modelName} ID`)

    const item = await (this.model[this.modelName as keyof PrismaClient] as any).update({
      where: {
        id,
        user_id: authUserId,
      },
      data,
    })

    if (!item) throw new Error(`${this.modelName} not found`)

    return item
  }

  //* Delete a item
  async deleteById(id: number, authUserId: number): Promise<any> {
    if (isNaN(id) || id <= 0) throw new Error(`Invalid ${this.modelName} ID`)

    return await (this.model[this.modelName as keyof PrismaClient] as any).delete({
      where: {
        id,
        user_id: authUserId,
      },
    })
  }

  //* Delete all items
  async destroyManyById(taskIds: number[], authUserId: number): Promise<any> {
    if (!Array.isArray(taskIds)) throw new Error('Invalid data')

    return await (this.model[this.modelName as keyof PrismaClient] as any).deleteMany({
      where: {
        id: { in: taskIds },
        user_id: authUserId,
      },
    })
  }
}

// --------------------------
export default Model
