"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["OK"] = 200] = "OK";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
    ResponseStatus[ResponseStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    ResponseStatus[ResponseStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
exports.default = ResponseStatus;
//# sourceMappingURL=response.status.enum.js.map