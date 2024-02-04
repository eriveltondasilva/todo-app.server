import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constants'

// ====================================
export default function generateTokens(user: any) {
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' })
  return { accessToken, refreshToken }
}
