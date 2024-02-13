import type { IUserModel } from '@/models/user.model'
import type { IResponse } from '@/services/response.service'
import type { NextFunction, Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_REFRESH_TOKEN_SECRET } from '@/config/constants'
import { ConflictError, UnauthorizedError } from '@/services/error.service'
import { generateAccessToken, generateTokens } from '@/utils/generateTokens'
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/utils/setSignedCookies'
import BaseController from './base.controller'

// ====================================
/** @desc Auth Controller Class */
class AuthController extends BaseController {
  constructor(
    protected response: IResponse,
    protected model: IUserModel,
  ) {
    super(response)
  }

  //# Auth Methods
  // --------------------------
  //* SIGNUP USER
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body

    try {
      // Check if user already exists
      const existingUser = await this.model.findByEmail(String(email))

      if (existingUser) {
        throw new ConflictError('user already exists')
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
      next(error)
    }
  }

  //* LOGIN USER ---------------------------------------------------------
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body

    try {
      // Find user by email
      const foundUser = await this.model.findByEmail(String(email))

      if (!foundUser) {
        throw new UnauthorizedError("user's email not found")
      }

      // -------------------------------------------------
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(String(password), foundUser.password)

      if (!isPasswordCorrect) {
        throw new UnauthorizedError("user's password is incorrect")
      }

      // Remove password and name from response
      delete foundUser.password

      // Generate JWT token
      const { accessToken, refreshToken } = generateTokens(foundUser)

      // Set cookies with access and refresh tokens
      setAccessTokenCookie(res, accessToken)
      setRefreshTokenCookie(res, refreshToken)

      // TODO: remove this
      const date = new Date().toLocaleTimeString()

      return this.response.ok(res, {
        message: 'logged in successfully!',
        date,
        user: foundUser,
      })
    } catch (error) {
      next(error)
    }
  }

  //* LOGOUT USER --------------------------------------------------------
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken } = req.signedCookies

      if (!accessToken) {
        throw new UnauthorizedError('access token not found')
      }

      // Clear cookies
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')

      return this.response.ok(res, {
        message: 'logged out successfully!',
        date: new Date().toLocaleTimeString(),
      })
    } catch (error) {
      next(error)
    }
  }

  //* REFRESH TOKEN ------------------------------------------------------
  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.signedCookies

      if (!refreshToken) {
        throw new UnauthorizedError('refresh token not found')
      }

      const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET)
      const accessToken = generateAccessToken(decoded.user)

      // Set cookies with access token
      setAccessTokenCookie(res, accessToken)

      // TODO: remove this
      const date = new Date().toLocaleTimeString()

      return this.response.ok(res, {
        message: 'access token refreshed successfully!',
        date,
      })
    } catch (error) {
      next(error)
    }
  }
}

// ------------------------------------
export default AuthController
