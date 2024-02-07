import type { IUserModel } from '@/models/userModel'
import type { IResponse } from '@/services/response'
import type { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_REFRESH_TOKEN_SECRET } from '@/config/constants'
import { generateAccessToken, generateTokens } from '@/utils/generateTokens'
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/utils/setSignedCookies'
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
      setAccessTokenCookie(res, accessToken)
      setRefreshTokenCookie(res, refreshToken)

      res.status(200).json({ message: 'logged in successfully!', user: foundUser })
    } catch (error) {
      console.error(error)
      return this.response.serverError(res, { message: 'login failed' })
    }
  }

  //* LOGOUT USER --------------------------------------------------------
  async logout(req: Request, res: Response): Promise<void> {
    const accessToken = req.signedCookies.access_token

    if (!accessToken) {
      return this.response.unauthorized(res, { message: 'access denied' })
    }

    // Clear cookies
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    res.status(200).json({ message: 'logged out successfully!' })
  }

  //* REFRESH TOKEN ------------------------------------------------------
  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.signedCookies.refresh_token

    if (!refreshToken) {
      return this.response.badRequest(res, { messages: 'refresh token is required' })
    }

    try {
      const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET)

      const accessToken = generateAccessToken(decoded.user)

      // Set cookies with access token
      setAccessTokenCookie(res, accessToken)

      res.status(200).json({ message: 'access token refreshed successfully!' })
    } catch (error) {
      console.error(error)
      return this.response.badRequest(res, { messages: 'error refreshing access token' })
    }
  }
}

// ------------------------------------
export default AuthController
