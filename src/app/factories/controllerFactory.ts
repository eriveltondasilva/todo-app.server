import ResponseService from '@/services/response'
import prisma from '@/singletons/prisma'
import { ResponseStatusEnum } from '@/enums/status'

// --------------------------------------
class ControllerFactory {
  static create(Controller: any, Model: any) {
    const modelInstance = new Model(prisma)
    const responseInstance = new ResponseService(ResponseStatusEnum)
    const controllerInstance = new Controller(responseInstance, modelInstance)

    // =>
    return controllerInstance
  }
}

// --------------------------------------
export default ControllerFactory
