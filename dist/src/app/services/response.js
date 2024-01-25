"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Response Service Class
 * @description A service class for handling HTTP responses with standardized status codes.
 **/
class ResponseService {
    constructor(status) {
        this.status = status;
    }
    //# RESPONSE SERVICE METHODS
    // --------------------------
    sendResponse(res, code, body) {
        return res.status(code).json(body);
    }
    // --------------------------
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
    notFound(res, body) {
        return this.sendResponse(res, this.status.NOT_FOUND, body);
    }
    serverError(res, body) {
        return this.sendResponse(res, this.status.SERVER_ERROR, body);
    }
}
// --------------------------
exports.default = ResponseService;
