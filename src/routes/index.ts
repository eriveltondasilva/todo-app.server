import { Express } from 'express'

import authRoutes from './auth.routes'
import publicRoutes from './public.routes'
import taskRoutes from './task.routes'

// ====================================
/** @desc Routes class handles the configuration of routes for the Express app */
class Routes {
  /** @desc Configures the routes for the Express app */
  static use(app: Express): void {
    app.use('/', publicRoutes)
    app.use('/api', authRoutes)
    app.use('/api', taskRoutes)
  }
}

// --------------------------
export default Routes
