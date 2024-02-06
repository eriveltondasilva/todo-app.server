import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../config/constants'

// type User = { id: number; name: string; email: string }
type Tokens = { accessToken: string; refreshToken: string }

// ====================================
export default function generateTokens(user: any): Tokens {
  // Generate JWT token
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  // =>> Return tokens
  return { accessToken, refreshToken }
}

// ------------------------------------
export function generateAccessToken(user: any) {
  return jwt.sign({ user }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export function generateRefreshToken(user: any) {
  return jwt.sign({ user }, JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
