//# GLOBAL MIDDLEWARES
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json, type Express } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'

//* constants
import { APP_HOST, COOKIE_PARSER_SECRET } from '@/config/env.config'

// ====================================
//* CORS options
const corsOptions = {
  origin: APP_HOST,
  credentials: true,
  maxAge: 15 * 60 * 1000, // 15 minutes
}

//* Rate limit options
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'You have exceeded the 100 requests in 15 min limit!',
  standardHeaders: true,
  legacyHeaders: false,
}

//* Morgan options
const morganOptions = 'dev'

// ----------------------------
/** @desc Global Middlewares */
class Middlewares {
  static use(app: Express): void {
    app.use(compression())
    app.use(json())
    app.use(helmet())
    app.use(cors(corsOptions))
    app.use(cookieParser(COOKIE_PARSER_SECRET))
    app.use(morgan(morganOptions))
    app.use(rateLimit(rateLimitOptions))
  }
}

// --------------------------
export default Middlewares
