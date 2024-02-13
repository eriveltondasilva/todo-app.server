import { NotFoundError } from '@/services/error.service'
import { PrismaClient } from '@prisma/client'

// interface
export interface IBaseModel {
  findAll(authUserId: number): Promise<any[]>
  findById(itemId: number, authUserId: number): Promise<any>
  create<T>(body: T, authUserId?: number): Promise<any>
  update<T>(itemId: number, body: T, authUserId: number): Promise<any>
  deleteById(itemId: number, authUserId: number): Promise<void>
  destroyManyById(itemIds: number[], authUserId: number): Promise<void>
}

// ====================================
/** @desc Base Model class */
abstract class BaseModel implements IBaseModel {
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

    if (!item) throw new NotFoundError(`${this.modelName} not found`)

    return item
  }

  //* Create a new item
  async create<T>(body: T, authUserId?: number): Promise<any> {
    const item = await (this.model[this.modelName as keyof PrismaClient] as any).create({
      data: {
        ...body,
        user_id: authUserId,
      },
    })

    if (!item) throw new Error(`${this.modelName} not created`)

    return item
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

    if (!item) throw new Error(`${this.modelName} not update`)

    return item
  }

  //* Delete a item
  async deleteById(itemId: number, authUserId: number): Promise<any> {
    const item = await (this.model[this.modelName as keyof PrismaClient] as any).delete({
      where: {
        id: itemId,
        user_id: authUserId,
      },
    })

    console.log(item)

    if (!item) throw new Error(`${this.modelName} not deleted`)

    return item
  }

  //* Delete all items
  async destroyManyById(itemIds: number[], authUserId?: number): Promise<any> {
    const items = await (this.model[this.modelName as keyof PrismaClient] as any).deleteMany({
      where: {
        id: {
          in: itemIds,
        },
        user_id: authUserId,
      },
    })

    if (!items.count) throw new Error(`${this.modelName}s not deleted`)

    return items
  }
}

// --------------------------
export default BaseModel
