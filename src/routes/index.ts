import { Express, Router } from 'express';

import authRoutes from './authRoutes';
import taskRoutes from './taskRoutes';
// import authRoutes from '';
// import taskRoutes from './taskRoutes';

/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 **/
class Routes {
  /** @desc Initializes and returns an array of Router instances. **/
  private static initializeRoutes(): Router[] {
    return [taskRoutes, authRoutes];
    // return []
  }

  /** @desc Configures the routes for the Express app. **/
  static use(app: Express): void {
    app.use('/api', Routes.initializeRoutes())
  }
}

// --------------------------
export default Routes
