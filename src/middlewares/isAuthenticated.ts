import type { AuthRequest } from '@/types/authRequest'
import type { NextFunction, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'

import { JWT_ACCESS_TOKEN_SECRET } from '@/config/constants'
import { UnauthorizedError } from '@/services/apiError'

// =====================================
function isAuthenticated(req: AuthRequest, _: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.signedCookies

  try {
    // Check if tokens exist
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedError('Failed to authenticate token')
    }

    // Verify token
    const decoded = jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET)

    req.user = (decoded as JwtPayload).user
    next()
  } catch (error) {
    next(error)
  }
}

// ------------------------------------
export default isAuthenticated
