import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

// =====================================
function getValidationErrors(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const errors = result.mapped()
    return res.status(422).json({ message: errors })
  }

  return next()
}

// ------------------------------------------
export default getValidationErrors
