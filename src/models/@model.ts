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
  async findAll(authUserId: number): Promise<any[]> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).findMany({
      where: {
        user_id: authUserId,
      },
    })
  }

  //* Find a item by its ID
  async findById(itemId: number, authUserId: number): Promise<any> {
    const item = await (this.model[this.modelName as keyof PrismaClient] as any).findUnique({
      where: {
        id: itemId,
        user_id: authUserId,
      },
    })

    if (!item) throw new Error(`${this.modelName} not found`)

    return item
  }

  //* Create a new item
  async create<T>(body: T, authUserId?: number): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).create({
      data: {
        ...body,
        user_id: authUserId,
      },
    })
  }

  //* Update a item
  async update<T>(itemId: number, body: T, authUserId: number): Promise<any> {
    const item = await (this.model[this.modelName as keyof PrismaClient] as any).update({
      where: {
        id: itemId,
        user_id: authUserId,
      },
      data: body,
    })

    if (!item) throw new Error(`${this.modelName} not found`)

    return item
  }

  //* Delete a item
  async deleteById(itemId: number, authUserId: number): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).delete({
      where: {
        id: itemId,
        user_id: authUserId,
      },
    })
  }

  //* Delete all items
  async destroyManyById(itemIds: number[], authUserId?: number): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).deleteMany({
      where: {
        id: { in: itemIds },
        user_id: authUserId,
      },
    })
  }
}

// --------------------------
export default Model
