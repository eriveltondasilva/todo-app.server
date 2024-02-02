import type { IModel } from '@/app/types/model'
import { PrismaClient } from '@prisma/client'

/**
 * @class Model
 * @desc Base Model class
 **/
abstract class Model implements IModel {
  protected modelName: string = this.constructor.name.toLowerCase().replace('model', '')

  constructor(protected model: PrismaClient) { }

  //# BASE MODEL METHODS
  // --------------------------
  //* Retrieves all model's items from the database.
  async findAll(): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).findMany()
  }

  //* Find a item by its ID
  async findById(id: number): Promise<any> {
    if (isNaN(id) || id <= 0) throw new Error(`Invalid ${this.modelName} ID`)

    const item = await (this.model[this.modelName as keyof PrismaClient] as any).findUnique({
      where: {
        id,
      },
    })

    if (!item) throw new Error(`${this.modelName} not found`)

    return item
  }

  //* Create a new item
  async create<T>(data: T): Promise<any> {
    return await (this.model[this.modelName as keyof PrismaClient] as any).create({
      data,
    })
  }

  //* Update a item
  async update<T>(id: number, data: T): Promise<any> {
    if (isNaN(id) || id <= 0) throw new Error(`Invalid ${this.modelName} ID`)

    const item = await (this.model[this.modelName as keyof PrismaClient] as any).update({
      where: {
        id,
      },
      data,
    })

    if (!item) throw new Error(`${this.modelName} not found`)

    return item
  }

  //* Delete a item
  async deleteById(id: number): Promise<any> {
    if (isNaN(id) || id <= 0) throw new Error(`Invalid ${this.modelName} ID`)

    return await (this.model[this.modelName as keyof PrismaClient] as any).delete({
      where: {
        id,
      },
    })
  }

  //* Delete all items
  async destroyManyById(data?: number[]): Promise<any> {
    if (!Array.isArray(data)) throw new Error('Invalid data')

    if (data?.length === 0) {
      return await (this.model[this.modelName as keyof PrismaClient] as any).deleteMany({})
    }

    return await (this.model[this.modelName as keyof PrismaClient] as any).deleteMany({
      where: {
        id: { in: data },
      },
    })
  }

  //
}

// --------------------------
export default Model
