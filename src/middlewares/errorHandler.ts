import ResponseStatus from '@/enums/responseStatus'
import type { Express, Request, Response } from 'express'

// =====================================
/** @desc Handles errors */
class ErrorHandler {
  /** @desc Use the error handler */
  static use(app: Express) {
    app.use(ErrorHandler.handler)
  }

  /** @desc Handles errors */
  static handler(error: any, _: Request, res: Response) {
    const errorMessage = error.message || 'Internal Server Error'
    const errorStatus = error.status || ResponseStatus.SERVER_ERROR
    const validations = error.validations || null

    // Log the error
    console.log('\n### ERROR HANDLING MIDDLEWARE ###')
    console.log('%s: %s \n', error.name, error.message)
    console.error(error.stack, '\n')

    // Send the error response
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      validations: validations,
    })
  }
}

// ------------------------------------
export default ErrorHandler
