"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
function validateToken(req, res, next) {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    jsonwebtoken_1.default.verify(token, constants_1.SECRET_JWT, (error, data) => {
        if (error) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.body.token = data;
        next();
    });
}
exports.default = validateToken;
