"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_status_enum_1 = __importDefault(require("../app/enums/response.status.enum"));
class ErrorHandler {
    static use(app) {
        app.use(ErrorHandler.handler);
    }
    static handler(error, _, res, next) {
        const errorMessage = error.message || 'Internal Server Error';
        const errorStatus = error.status || response_status_enum_1.default.SERVER_ERROR;
        const validations = error.validations || null;
        console.log('\n### ERROR HANDLING MIDDLEWARE ###');
        console.log('%s: %s \n', error.name, error.message);
        console.error(error.stack, '\n');
        return res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            validations: validations,
        });
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=error.handler.mw.js.map