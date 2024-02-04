//# GLOBAL MIDDLEWARES
import { Express, json } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'

// ====================================

// import { APP_HOST } from '@/config/constants'
// const corsOptions = {
//   origin: APP_HOST,
// }

const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}

const morganOptions = 'dev'

/**
 * @class Middlewares
 * @desc A class that contains global middlewares
 */
class Middlewares {
  static use(app: Express): void {
    app.use(json())
    app.use(helmet())
    app.use(morgan(morganOptions))
    app.use(rateLimit(rateLimitOptions))
    // app.use(cors(corsOptions))
  }
}

// --------------------------
export default Middlewares
