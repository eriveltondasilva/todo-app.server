"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.generateTokens = void 0;
const constants_1 = require("../config/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTokens(user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
}
exports.generateTokens = generateTokens;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ user }, constants_1.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign({ user }, constants_1.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateTokens.js.map