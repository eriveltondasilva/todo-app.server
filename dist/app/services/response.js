"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../enums/responseStatus"));
class ResponseService {
    constructor() {
        this.status = responseStatus_1.default;
    }
    sendResponse(res, code, body) {
        return res.status(code).json(body);
    }
    ok(res, body) {
        return this.sendResponse(res, this.status.OK, body);
    }
    created(res, body) {
        return this.sendResponse(res, this.status.CREATED, body);
    }
    noContent(res) {
        return this.sendResponse(res, this.status.NO_CONTENT);
    }
    badRequest(res, body) {
        return this.sendResponse(res, this.status.BAD_REQUEST, body);
    }
    unauthorized(res, body) {
        return this.sendResponse(res, this.status.UNAUTHORIZED, body);
    }
    notFound(res, body) {
        return this.sendResponse(res, this.status.NOT_FOUND, body);
    }
    serverError(res, body) {
        return this.sendResponse(res, this.status.SERVER_ERROR, body);
    }
}
exports.default = ResponseService;
//# sourceMappingURL=response.js.map