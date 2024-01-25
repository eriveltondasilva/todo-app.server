import ResponseService from '../../app/services/response'
import prisma from '../singletons/prisma'
import { StatusEnum } from '../enums/status'

// --------------------------------------
class ControllerFactory {
  static create(Controller: any, Model: any) {
    const modelInstance = new Model(prisma)
    const responseInstance = new ResponseService(StatusEnum)
    const controllerInstance = new Controller(responseInstance, modelInstance)

    // =>
    return controllerInstance
  }
}

// --------------------------------------
export default ControllerFactory
