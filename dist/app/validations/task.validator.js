"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_validation_errors_mw_1 = __importDefault(require("../../middlewares/get.validation.errors.mw"));
const express_validator_1 = require("express-validator");
const idParamValidation = [
    (0, express_validator_1.param)('id')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('id is required')
        .isInt({ min: 1 })
        .withMessage('id must be an integer')
        .trim()
        .escape()
];
const showValidation = [
    ...idParamValidation,
    get_validation_errors_mw_1.default
];
const updateValidation = [
    ...idParamValidation,
    (0, express_validator_1.body)('title')
        .optional()
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long')
        .trim().escape(),
    (0, express_validator_1.body)('is_completed')
        .optional()
        .isBoolean()
        .withMessage('is_completed must be a boolean')
        .toBoolean()
        .escape(),
    get_validation_errors_mw_1.default
];
const destroyValidation = [
    ...idParamValidation,
    get_validation_errors_mw_1.default
];
const createValidation = [
    (0, express_validator_1.body)('title')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long')
        .trim().escape(),
    (0, express_validator_1.body)('is_completed')
        .optional()
        .isBoolean()
        .withMessage('is_completed must be a boolean')
        .toBoolean()
        .escape(),
    get_validation_errors_mw_1.default
];
const destroyManyValidation = [
    (0, express_validator_1.body)('ids')
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage('ids is required')
        .isArray({ min: 1 })
        .withMessage('ids must be an array with at least one item')
        .isInt({ min: 1 })
        .withMessage('ids must be an array of integers')
        .escape(),
    get_validation_errors_mw_1.default,
];
exports.default = {
    createValidation,
    showValidation,
    updateValidation,
    destroyValidation,
    destroyManyValidation,
};
//# sourceMappingURL=task.validator.js.map