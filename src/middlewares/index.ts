//# GLOBAL MIDDLEWARES
import compression from 'compression'
import cors from 'cors'
import { Express, json } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'

import { APP_HOST } from '@/config/constants'

// ====================================

//# CORS options
const corsOptions = {
  origin: APP_HOST,
}

//# Rate limit options
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
}

//# Morgan options
const morganOptions = 'dev'

/**
 * @class Middlewares
 * @desc A class that contains global middlewares
 */
class Middlewares {
  static use(app: Express): void {
    app.use(compression())
    app.use(json())
    app.use(helmet())
    app.use(morgan(morganOptions))
    app.use(rateLimit(rateLimitOptions))
    app.use(cors(corsOptions))
  }
}

// --------------------------
export default Middlewares
