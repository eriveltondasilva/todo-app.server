import type { Express, Request, Response } from 'express'
import express from 'express'

import Server from './server'

// ====================================
//* Create instance of Express application
const app: Express = express()

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})

// ------------------------------------
//* Start the server
Server.start(app)
