"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatusEnum = void 0;
//# ENUMS FOR HTTP RESPONSES
var ResponseStatusEnum;
(function (ResponseStatusEnum) {
    ResponseStatusEnum[ResponseStatusEnum["OK"] = 200] = "OK";
    ResponseStatusEnum[ResponseStatusEnum["CREATED"] = 201] = "CREATED";
    ResponseStatusEnum[ResponseStatusEnum["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatusEnum[ResponseStatusEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatusEnum[ResponseStatusEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatusEnum[ResponseStatusEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatusEnum[ResponseStatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatusEnum[ResponseStatusEnum["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(ResponseStatusEnum || (exports.ResponseStatusEnum = ResponseStatusEnum = {}));
