import express, { type Express } from 'express'

import 'express-async-errors' // To handle async errors

import ErrorHandler from './middlewares/errorHandler'
import Middlewares from './middlewares/index'
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
