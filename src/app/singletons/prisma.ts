import { PrismaClient } from '@prisma/client'
/**
 * @class PrismaSingleton
 * @desc Singleton class for PrismaClient instance
 */
class PrismaSingleton {
  private static instance: PrismaClient

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton?.instance) {
      PrismaSingleton.instance = new PrismaClient()
    }

    // => Prevent multiple instances
    return PrismaSingleton.instance
  }
}

// ------------------------------------
const prismaSingleton = PrismaSingleton.getInstance()
export default prismaSingleton
