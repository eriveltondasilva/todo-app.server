import type { Express } from 'express'

import authRoutes from './auth'
import taskRoutes from './task'

const routes = [taskRoutes, authRoutes]

/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 **/
class Routes {
  /** @desc Configures the routes for the Express app **/
  static use(app: Express): void {
    app.use('/api', routes)
  }
}

// --------------------------
export default Routes
