import { SECRET_JWT } from '@/config/constants'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { promisify } from 'util'

const jwtVerify = promisify<string, Secret>(jwt.verify)

// =====================================
async function validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers['authorization']?.split(' ')[1]

    // Check if token exists
    if (!token || typeof token !== 'string') {
      throw new Error('Access denied')
    }

    // Verify token
    const data = await jwtVerify(token, SECRET_JWT)

    req.body.token = data
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Failed to authenticate token' })
  }
}

// ------------------------------------
export default validateToken
