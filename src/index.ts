import express, { Express } from 'express'

import Middlewares from './middlewares'
import ErrorHandler from './middlewares/errorHandler'
import Routes from './routes'
import Server from './server'

// ====================================
//* Create instance of Express application
const app: Express = express()

// ------------------------------------
//* Use the middlewares defined in the Middlewares module
Middlewares.use(app)

// ------------------------------------
//* Use the routes defined in the Routes module
Routes.use(app)

// ------------------------------------
//* Use the error handler
ErrorHandler.use(app)

// ------------------------------------
//* Start the server
Server.start(app)
