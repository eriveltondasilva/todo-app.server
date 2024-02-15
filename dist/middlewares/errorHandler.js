"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../app/enums/responseStatus"));
class ErrorHandler {
    static use(app) {
        app.use(ErrorHandler.handler);
    }
    static handler(error, _, res) {
        const errorMessage = error.message || 'Internal Server Error';
        const errorStatus = error.status || responseStatus_1.default.SERVER_ERROR;
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
//# sourceMappingURL=errorHandler.js.map