export const APP_PORT = Number(process.env.APP_PORT) || 3000
export const APP_HOST = process.env.APP_HOST || 'http://localhost:' + Number(process.env.APP_PORT)
export const SECRET_JWT = process.env.SECRET_JWT || 'secret'
