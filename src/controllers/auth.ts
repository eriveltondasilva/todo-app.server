import bcrypt from 'bcrypt'
import type { Request, Response } from 'express'
import type { IUserModel } from '../app/types/model'
import type { IResponse } from '../app/types/response'

import Controller from './@controller'

// ------------------------------------
class AuthController extends Controller {
  constructor(
    protected response: IResponse,
    protected model: IUserModel,
  ) {
    super(response, model)
  }

  //# Auth Methods
  async signup(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body
    const validationError = { error: 'Email and password are required' }
    const userExistsError = { error: 'User already exists' }
    const createUserError = { error: 'User not created' }

    // Validate user
    if (!email || !password) {
      return this.response.badRequest(res, validationError)
    }

    // Check if user already exists
    const user = await this.model.findByEmail(String(email))

    if (user) {
      return this.response.badRequest(res, userExistsError)
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(String(password), 8)

    // Create user
    try {
      const newUser = await this.model.create({
        name: String(name),
        email: String(email),
        password: hashedPassword,
      })
      return this.response.created(res, newUser)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, createUserError)
    }
  }

  //

  //

  // TODO: Implement Login
  async login(_: Request, res: Response): Promise<void> {
    return this.response.ok(res, { msg: 'teste' })
  }

  async logout(_: Request, res: Response): Promise<void> {
    return this.response.ok(res)
  }
}

// ------------------------------------
export default AuthController
