import type { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { AuthRequest } from '../app/types/authRequest'

import { JWT_ACCESS_TOKEN_SECRET } from '../app/config/constants'

// =====================================
function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const accessToken = req.cookies.access_token

  // Check if token exists
  if (!accessToken) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET)

    req.user = (decoded as JwtPayload).user
    // TODO: remover!
    console.log('decoded', req.user)
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Failed to authenticate token' })
  }
}

// ------------------------------------
export default isAuthenticated
