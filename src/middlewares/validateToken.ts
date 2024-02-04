import type { AuthRequest } from '@/types/authRequest'
import type { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import { SECRET_JWT } from '@/config/constants'

// =====================================
function validateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_JWT)

    req.user = decoded
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Failed to authenticate token' })
  }
}

// ------------------------------------
export default validateToken
