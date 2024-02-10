import ResponseStatus from '@/enums/responseStatus'
import type { Express, NextFunction, Request, Response } from 'express'

// =====================================
/** @desc Handles errors */
class ErrorHandler {
  /** @desc Use the error handler */
  static use(app: Express) {
    app.use(ErrorHandler.handler)
  }

  /** @desc Handles errors */
  static handler(error: any, _: Request, res: Response, next: NextFunction) {
    const errorMessage = error.message || 'Internal Server Error'
    const errorStatus = error.status || ResponseStatus.SERVER_ERROR

    // Log the error
    console.log('\n=> Middleware Error Handling\n')
    console.log('%s: %s \n', error.name, error.message)
    // console.error(error.stack)

    // Send the error response
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    })
  }
}

// ------------------------------------
export default ErrorHandler
