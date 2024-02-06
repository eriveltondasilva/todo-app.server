export const APP_PORT = Number(process.env.APP_PORT) || 3000
export const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'accessToken12345'
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshToken12345'
