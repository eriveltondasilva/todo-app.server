import { Express } from 'express'

import authRoutes from './authRoutes'
import publicRoutes from './publicRoutes'
import taskRoutes from './taskRoutes'

/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 */
class Routes {
  /** @desc Configures the routes for the Express app. **/
  static use(app: Express): void {
    app.use(publicRoutes)
    app.use('/api', authRoutes)
    app.use('/api', taskRoutes)
  }
}

// --------------------------
export default Routes
