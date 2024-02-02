import type { IModel } from '@app/types/model'
import type { IResponse } from '@app/types/response'

/** --------------------------
 * @class BaseController
 * @desc Base Controller Class
 */
abstract class Controller {
  protected methods = this.getMethods(this)

  constructor(
    protected response: IResponse,
    protected model: IModel,
  ) {
    this.bindMethods()
  }

  //# CONTROLLER METHODS
  // --------------------------
  //* Get the list of methods in the derived class
  private getMethods<T>(instance: T): (keyof T)[] {
    const prototype = Object.getPrototypeOf(instance)

    const filteredMethods = (name: string) =>
      typeof instance[name as keyof T] === 'function' && name !== 'constructor'

    // =>
    return Object.getOwnPropertyNames(prototype).filter(filteredMethods) as (keyof T)[]
  }

  //* Bind methods to the current instance
  private bindMethods(): void {
    this.methods.forEach((method) => {
      this[method] = (this[method] as Function).bind(this)
    })
  }
}

// --------------------------
export default Controller
