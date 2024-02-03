import { Express } from 'express'

import authRoutes from './authRoutes'
import taskRoutes from './taskRoutes'

/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 */
class Routes {
  private static readonly api = '/api'
  /** @desc Configures the routes for the Express app. **/
  static use(app: Express): void {
    app.use(this.api, authRoutes)
    app.use(this.api, taskRoutes)
  }
}

// --------------------------
export default Routes
