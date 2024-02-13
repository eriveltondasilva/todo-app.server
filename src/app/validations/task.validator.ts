import { body, param } from 'express-validator'

import getValidationErrors from '@/middlewares/getValidationErrors'

// ====================================
// prettier-ignore
const idValidation = [
  param('id')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be an integer')
    .trim()
    .escape()
]

// prettier-ignore
const commonValidation = [
  body('title')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long')
    .trim().escape(),

  body('is_completed')
    .optional()
    .isBoolean()
    .withMessage('is_completed must be a boolean')
    .escape(),
]

// ------------------------------------
// prettier-ignore
const createValidation = [
  ...commonValidation,
  getValidationErrors
]

// prettier-ignore
const showValidation = [
  ...idValidation,
  getValidationErrors
]

// prettier-ignore
const updateValidation = [
  ...idValidation,
  ...commonValidation,
  getValidationErrors
]

// prettier-ignore
const destroyValidation = [
  ...idValidation, 
  getValidationErrors
]

const destroyManyValidation = [
  body('ids')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('ids is required')
    .isArray({ min: 1 })
    .withMessage('ids must be an array with at least one item')
    .isInt({ min: 1 })
    .withMessage('ids must be an array of integers')
    .escape(),

  getValidationErrors,
]

// ------------------------------------
export default {
  create: createValidation,
  show: showValidation,
  update: updateValidation,
  destroy: destroyValidation,
  destroyMany: destroyManyValidation,
}
