import { Response } from 'express'

// ====================================
function setCookie(res: Response, name: string, value: string) {
  return res.cookie(name, value, {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
  })
}

// ------------------------------------
export function setAccessTokenCookie(res: Response, token: string) {
  return setCookie(res, 'accessToken', token)
}

export function setRefreshTokenCookie(res: Response, token: string) {
  return setCookie(res, 'refreshToken', token)
}
