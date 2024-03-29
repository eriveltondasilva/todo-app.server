"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_validation_errors_mw_1 = __importDefault(require("../../middlewares/get.validation.errors.mw"));
const express_validator_1 = require("express-validator");
const commonValidation = [
    (0, express_validator_1.body)('email')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail()
        .trim()
        .escape(),
    (0, express_validator_1.body)('password')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .trim()
        .escape(),
];
const loginValidation = [
    ...commonValidation,
    get_validation_errors_mw_1.default
];
const registerValidation = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .escape(),
    (0, express_validator_1.body)('role')
        .optional()
        .isIn(['ADMIN', 'USER'])
        .withMessage('Role must be ADMIN or USER')
        .trim()
        .escape(),
    ...commonValidation,
    get_validation_errors_mw_1.default,
];
exports.default = { loginValidation, registerValidation };
//# sourceMappingURL=auth.validator.js.map