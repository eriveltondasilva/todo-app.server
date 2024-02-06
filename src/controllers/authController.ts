import type { IUserModel } from '@/types/model'
import type { IResponse } from '@/types/response'
import type { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_REFRESH_TOKEN_SECRET } from '@/config/constants'
import generateTokens, { generateAccessToken } from '@/utils/generateTokens'
import Controller from './@controller'

// ====================================
/** @class Auth Controller Class */
class AuthController extends Controller {
  //* Error massages
  private readonly messages = {
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
    super(response)
  }

  //# Auth Methods
  // --------------------------
  //* Signup user
  async signup(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body

    try {
      // Check if user already exists
      const existingUser = await this.model.findByEmail(String(email))

      if (existingUser) {
        return this.response.badRequest(res, { messages: this.messages.userExists })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(String(password), 8)

      // Create user
      const newUser = await this.model.create({
        name: String(name || ''),
        email: String(email),
        password: hashedPassword,
      })

      // Remove password from response
      delete newUser.password

      // Respond with the created user subset
      return this.response.created(res, newUser)
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, { messages: this.messages.createUser })
    }
  }

  //* Login user ---------------------------------------------------------
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      // Find user by email
      const foundUser = await this.model.findByEmail(String(email))

      if (!foundUser) {
        this.response.unauthorized(res, { message: this.messages.userNotFound })
      }

      // -------------------------------------------------
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(String(password), foundUser.password)

      if (!isPasswordCorrect) {
        return this.response.unauthorized(res, { message: this.messages.wrongPassword })
      }

      // Remove password and name from response
      delete foundUser.password

      // Generate JWT token
      const tokens = generateTokens(foundUser)

      // Login user
      this.response.ok(res, tokens)
    } catch (error) {
      console.error(error)
      return this.response.serverError(res, { message: this.messages.login })
    }
  }

  //* Refresh token ------------------------------------------------------
  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return this.response.badRequest(res, { messages: 'Refresh token is required' })
    }

    try {
      const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET)

      const accessToken = generateAccessToken(decoded)

      return this.response.ok(res, { accessToken })
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, { messages: 'Error refreshing access token' })
    }
  }
}

// ------------------------------------
export default AuthController
