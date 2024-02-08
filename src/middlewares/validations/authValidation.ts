import { body } from 'express-validator'
import getValidationErrors from './getValidationErrors'

// ====================================
const commonValidation = [
  body('email')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail()
    .trim()
    .escape(),

  body('password')
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .trim()
    .escape(),
]

// ------------------------------------
// prettier-ignore
const loginValidation = [
  ...commonValidation,
  getValidationErrors
]

// prettier-ignore
const registerValidation = [
  body('name')
    .optional()
    .trim()
    .escape(),

  body('role')
    .optional()
    .isIn(['ADMIN', 'USER'])
    .withMessage('Role must be ADMIN or USER')
    .trim()
    .escape(),

  ...commonValidation,
  getValidationErrors,
]

// ------------------------------------
export default { login: loginValidation, register: registerValidation }
