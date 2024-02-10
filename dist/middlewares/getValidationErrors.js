"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../app/enums/responseStatus"));
const express_validator_1 = require("express-validator");
function getValidationErrors(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        return next();
    }
    const errors = result
        .array({ onlyFirstError: true })
        .map((error) => ({ [error.path]: error.msg }));
    return res.status(responseStatus_1.default.UNPROCESSABLE_ENTITY).json({ errors });
}
exports.default = getValidationErrors;
//# sourceMappingURL=getValidationErrors.js.map