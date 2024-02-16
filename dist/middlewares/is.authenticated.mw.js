"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../app/config/env.config");
const error_service_1 = require("../app/services/error.service");
function isAuthenticated(req, _, next) {
    const { accessToken, refreshToken } = req.signedCookies;
    if (!accessToken && !refreshToken) {
        throw new error_service_1.UnauthorizedError('access denied');
    }
    const decoded = jsonwebtoken_1.default.verify(accessToken, env_config_1.JWT_ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
}
exports.default = isAuthenticated;
//# sourceMappingURL=is.authenticated.mw.js.map