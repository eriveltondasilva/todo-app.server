import { APP_PORT } from '@/config/env.config'
import { Express } from 'express'

async function start(app: Express) {
  const message = '🚀 Server running... \n🚪 Port: %d'
  try {
    await app.listen(APP_PORT)
    console.log(message, APP_PORT)
  } catch (e: any) {
    console.error(e.message)
    process.exit(1)
  }
}

export default { start }
