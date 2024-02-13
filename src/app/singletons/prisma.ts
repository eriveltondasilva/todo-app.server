import { PrismaClient } from '@prisma/client'

/** @class Singleton class for PrismaClient */
class PrismaSingleton {
  private static instance: PrismaClient

  /** @desc Singleton class for PrismaClient instance */
  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient()
    }

    // => Prevent multiple instances
    return PrismaSingleton.instance
  }
}

// ------------------------------------
const prismaSingleton = PrismaSingleton.getInstance()
export default prismaSingleton
