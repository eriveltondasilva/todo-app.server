"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../app/config/constants");
function isAuthenticated(req, res, next) {
    const accessToken = req.signedCookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ message: 'access denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, constants_1.JWT_ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
}
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map