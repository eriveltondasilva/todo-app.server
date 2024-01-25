"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Response Service Class
 * @description A service class for handling HTTP responses with standardized status codes.
 **/
class ResponseService {
    constructor() {
        this.status = StatusEnum;
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
//
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["OK"] = 200] = "OK";
    StatusEnum[StatusEnum["CREATED"] = 201] = "CREATED";
    StatusEnum[StatusEnum["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusEnum[StatusEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusEnum[StatusEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusEnum[StatusEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusEnum[StatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusEnum[StatusEnum["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(StatusEnum || (StatusEnum = {}));
// --------------------------
exports.default = ResponseService;
