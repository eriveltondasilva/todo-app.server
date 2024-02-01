import type { Express, Router } from 'express';

import authRoutes from './auth';
import taskRoutes from './task';

/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 **/
class Routes {
  /** @desc Initializes and returns an array of Router instances. **/
  private static initializeRoutes(): Router[] {
    return [taskRoutes, authRoutes];
  }

  /** @desc Configures the routes for the Express app. **/
  static use(app: Express): void {
    app.use('/api', Routes.initializeRoutes())
  }
}

// --------------------------
export default Routes
