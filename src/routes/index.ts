import type { Express } from 'express'

import task from './task'

/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 **/
class Routes {
  /** @desc Configures the routes for the Express app **/
  static use(app: Express): void {
    app.use('/api', task)
    // App.use('/api', [])
  }
}

// --------------------------
export default Routes
