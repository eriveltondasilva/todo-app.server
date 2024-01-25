import type { Express } from 'express'
import express from 'express'

import Routes from './routes'
import Server from './server'

// ====================================
//* Create instance of Express application
const app: Express = express()

// ------------------------------------
//* Use the middlewares defined in the Middlewares module
// Middlewares.use(App)

// ------------------------------------
//* Use the routes defined in the Routes module
Routes.use(app)

// ------------------------------------
//* Start the server
Server.start(app)
