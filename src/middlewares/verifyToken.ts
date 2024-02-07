import type { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { AuthRequest } from '../app/types/authRequest'

import { JWT_ACCESS_TOKEN_SECRET } from '../app/config/constants'

// =====================================
function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET)

    req.user = (decoded as JwtPayload).user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Failed to authenticate token' })
  }
}

// ------------------------------------
export default verifyToken
