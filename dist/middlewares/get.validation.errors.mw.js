"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const error_service_1 = require("../app/services/error.service");
function getValidationErrors(req, _, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        const errors = result.formatWith((error) => error.msg).mapped();
        throw new error_service_1.ValidationError('Validation Error', errors);
    }
    return next();
}
exports.default = getValidationErrors;
//# sourceMappingURL=get.validation.errors.mw.js.map