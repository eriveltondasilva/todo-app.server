"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NotFoundError = exports.ConflictError = exports.UnauthorizedError = void 0;
const responseStatus_1 = __importDefault(require("../enums/responseStatus"));
class BaseError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized') {
        super(message, responseStatus_1.default.UNAUTHORIZED);
        this.message = message;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError extends BaseError {
    constructor(message = 'Conflict') {
        super(message, responseStatus_1.default.CONFLICT);
        this.message = message;
    }
}
exports.ConflictError = ConflictError;
class NotFoundError extends BaseError {
    constructor(message = 'Not Found') {
        super(message, responseStatus_1.default.NOT_FOUND);
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends BaseError {
    constructor(message = 'Validation Error', validations) {
        super(message, responseStatus_1.default.UNPROCESSABLE_ENTITY);
        this.message = message;
        this.validations = validations;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=error.service.js.map