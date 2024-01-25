import cors from 'cors'
import { Express, json } from 'express'

/**
 * @class Middlewares
 * @desc A class that contains middlewares for the server
 **/
class Middlewares {
  /** @desc Adds middlewares to the Express application **/
  static use(App: Express): void {
    App.use(cors())
    App.use(json())
  }
}

// --------------------------
export default Middlewares
