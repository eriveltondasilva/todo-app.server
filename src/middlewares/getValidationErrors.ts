import ResponseStatus from '@/enums/responseStatus'
import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

// =====================================
function getValidationErrors(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req)

  if (result.isEmpty()) {
    return next()
  }

  const errors = result
    .array({ onlyFirstError: true })
    .map((error: any) => ({ [error.path]: error.msg }))
  return res.status(ResponseStatus.UNPROCESSABLE_ENTITY).json({ errors })
}

// ------------------------------------------
export default getValidationErrors
