import getValidationErrors from '@/middlewares/get.validation.errors.mw'
import { body, param } from 'express-validator'

// ====================================
// prettier-ignore
const idParamValidation = [
  param('id')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('id is required')
    .isInt({ min: 1 })
    .withMessage('id must be an integer')
    .trim()
    .escape()
]

// ------------------------------------
// prettier-ignore
const showValidation = [
  ...idParamValidation,
  getValidationErrors
]

// prettier-ignore
const updateValidation = [
  ...idParamValidation,

  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long')
    .trim().escape(),

  body('is_completed')
    .optional()
    .isBoolean()
    .withMessage('is_completed must be a boolean')
    .toBoolean()
    .escape(),

  getValidationErrors
]

// prettier-ignore
const destroyValidation = [
  ...idParamValidation, 
  getValidationErrors
]

// prettier-ignore
const createValidation = [
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
    .toBoolean()
    .escape(),

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
  createValidation,
  showValidation,
  updateValidation,
  destroyValidation,
  destroyManyValidation,
}
