"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../app/config/constants");
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.JWT_ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
}
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map