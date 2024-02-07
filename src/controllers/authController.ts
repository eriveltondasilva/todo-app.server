import type { IUserModel } from '@/models/userModel'
import type { IResponse } from '@/services/response'
import type { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_REFRESH_TOKEN_SECRET } from '@/config/constants'
import { generateAccessToken, generateTokens } from '@/utils/generateTokens'
import Controller from './@controller'

// ====================================
/** @class Auth Controller Class */
class AuthController extends Controller {
  constructor(
    protected response: IResponse,
    protected model: IUserModel,
  ) {
    super(response)
  }

  //# Auth Methods
  // --------------------------
  //* SIGNUP USER
  async signup(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body

    try {
      // Check if user already exists
      const existingUser = await this.model.findByEmail(String(email))

      if (existingUser) {
        return this.response.badRequest(res, { messages: 'user already exists' })
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
      return this.response.badRequest(res, { messages: 'error creating user' })
    }
  }

  //* LOGIN USER ---------------------------------------------------------
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      // Find user by email
      const foundUser = await this.model.findByEmail(String(email))

      if (!foundUser) {
        this.response.unauthorized(res, { message: 'user not found' })
      }

      // -------------------------------------------------
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(String(password), foundUser.password)

      if (!isPasswordCorrect) {
        return this.response.unauthorized(res, { message: 'wrong password' })
      }

      // Remove password and name from response
      delete foundUser.password

      // Generate JWT token
      const { accessToken, refreshToken } = generateTokens(foundUser)

      // Set cookies with access and refresh tokens
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
      })
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
      })

      res.status(200).json({ message: 'Logged in successfully!', user: foundUser })
      // .header('authorization', `Bearer ${accessToken}`)
      // .json(foundUser)
    } catch (error) {
      console.error(error)
      return this.response.serverError(res, { message: 'login failed' })
    }
  }

  //* LOGOUT USER --------------------------------------------------------
  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    res.status(200).json({ message: 'Logged out successfully!' })
  }

  //* REFRESH TOKEN ------------------------------------------------------
  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
      return this.response.badRequest(res, { messages: 'refresh token is required' })
    }

    try {
      const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET)

      const accessToken = generateAccessToken(decoded.user)

      // Set cookies with access token
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
      })

      res.status(200).json({ message: 'access token refreshed successfully!' })
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, { messages: 'error refreshing access token' })
    }
  }
}

// ------------------------------------
export default AuthController
