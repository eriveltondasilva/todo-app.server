import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { SECRET_JWT } from '@/config/constants'

// =====================================
export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Access denied' })
  }

  // Verify token
  jwt.verify(token, SECRET_JWT, (error, data) => {
    if (error) {
      return res.status(401).json({ error: 'Failed to authenticate token' })
    }

    req.body.token = data
    next()
  })
}
