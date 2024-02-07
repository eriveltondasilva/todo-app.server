//# GLOBAL MIDDLEWARES
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Express, json } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'

//* constants
import { APP_HOST } from '@/config/constants'

// ====================================
//* CORS options
const corsOptions = {
  origin: APP_HOST,
}

//* Rate limit options
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
}

//* Morgan options
const morganOptions = 'dev'

// ----------------------------
/** @class Global Middlewares */
class Middlewares {
  static use(app: Express): void {
    app.use(cookieParser())
    // app.use(cookieParser(COOKIE_PARSER_SECRET))
    app.use(compression())
    app.use(cors())
    app.use(json())
    app.use(helmet())
    app.use(morgan(morganOptions))
    app.use(rateLimit(rateLimitOptions))
  }
}

// --------------------------
export default Middlewares
