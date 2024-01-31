import type { IUserModel } from 'app/types/model'
import type { IResponse } from 'app/types/response'
import type { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SECRET_JWT } from 'app/config/constants'
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
  // --------------------------
  //* Signup user
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

  //* Login user
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    // Error massage
    const validationError = { error: 'Email and password are required' }
    const userNotFoundError = { error: 'User not found' }
    const wrongPasswordError = { error: 'Wrong password' }

    // Validate user
    if (!email || !password) {
      return this.response.badRequest(res, validationError)
    }

    // Find user
    const user = await this.model.findByEmail(String(email))
    if (!user) {
      return this.response.badRequest(res, userNotFoundError)
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(String(password), user.password)
    if (!isPasswordCorrect) {
      return this.response.badRequest(res, wrongPasswordError)
    }

    const token = jwt.sign({ id: user.id }, SECRET_JWT, { expiresIn: '1h' })

    // Login user
    return this.response.ok(res, { token: token })
  }

  // * Logout user
  async logout(_: Request, res: Response): Promise<void> {}
}

// ------------------------------------
export default AuthController
