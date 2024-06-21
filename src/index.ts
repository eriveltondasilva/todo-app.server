import express, { type Express } from 'express'

import 'express-async-errors' // To handle async errors

import Middlewares from './middlewares/@index.mw'
import ErrorHandler from './middlewares/error.handler.mw'
import Routes from './routes/@index.routes'
import Server from './server'

// ====================================
const app: Express = express()

Middlewares.use(app)
Routes.use(app)
ErrorHandler.use(app)
Server.start(app)
