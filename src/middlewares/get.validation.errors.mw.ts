import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { ValidationError } from '@/services/error.service'

// =====================================
export default function getValidationErrors(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const errors = result.formatWith((error) => error.msg).mapped()
    // const errors = result.formatWith((error) => error.msg).array({ onlyFirstError: true })
    throw new ValidationError('Validation Error', errors)
  }

  return next()
}
