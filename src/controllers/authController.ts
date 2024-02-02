import { IUserModel } from '@/types/model'
import { IResponse } from '@/types/response'
import { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { SECRET_JWT } from '@/config/constants'
import Controller from './@controller'

// ====================================
/** @class Auth Controller Class */
class AuthController extends Controller {
  //* Error massages
  private readonly errors = {
    createUser: 'Error creating user',
    userExists: 'User already exists',
    userNotFound: 'User not found',
    validation: 'Email and password are required',
    wrongPassword: 'Wrong password',
    login: 'Login failed',
  }

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

    // Validate user input
    if (!email || !password) {
      return this.response.badRequest(res, this.errors.validation)
    }

    // Check if user already exists
    const existingUser = await this.model.findByEmail(String(email))

    if (existingUser) {
      return this.response.badRequest(res, this.errors.userExists)
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(String(password), 8)

      // Create user
      const newUser = await this.model.create({
        name: String(name || ''),
        email: String(email),
        password: hashedPassword,
      })

      // Create a subset of user data for response
      const userSubset = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }

      // Respond with the created user subset
      return this.response.created(res, userSubset)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, this.errors.createUser)
    }
  }

  //* Login user
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    // Validate user input
    if (!email || !password) {
      return this.response.badRequest(res, this.errors.validation)
    }

    // Find user by email
    const foundUser = await this.model.findByEmail(String(email))

    if (!foundUser) {
      return this.response.badRequest(res, this.errors.userNotFound)
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(String(password), foundUser.password)

    if (!isPasswordCorrect) {
      return this.response.badRequest(res, this.errors.wrongPassword)
    }

    try {
      // Generate JWT token
      const token = jwt.sign({ id: foundUser.id }, SECRET_JWT, { expiresIn: '1h' })

      // Login user
      return this.response.ok(res, { token })
    } catch (error) {
      console.error(error)
      return this.response.serverError(res, this.errors.login)
    }
  }

  // * Logout user
  // TODO: Implement this method later
  async logout(_: Request, res: Response): Promise<void> {}
}

// ------------------------------------
export default AuthController
