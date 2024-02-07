"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function getValidationErrors(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        const errors = result.mapped();
        return res.status(422).json({ message: errors });
    }
    return next();
}
exports.default = getValidationErrors;
//# sourceMappingURL=getValidationErrors.js.map