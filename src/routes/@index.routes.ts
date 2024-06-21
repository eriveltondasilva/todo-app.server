import type { Express } from 'express'

import authRoutes from './auth.routes'
import publicRoutes from './public.routes'
import taskRoutes from './task.routes'

function routes(app: Express): void {
  app.use('/', publicRoutes)
  app.use('/api', authRoutes)
  app.use('/api', taskRoutes)
}

// --------------------------
export default { use: routes }
