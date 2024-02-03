"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../enums/status");
class ResponseService {
    constructor() {
        this.status = status_1.ResponseStatusEnum;
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
