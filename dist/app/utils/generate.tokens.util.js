"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = generateTokens;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const env_config_1 = require("../config/env.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTokens(user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { accessToken, refreshToken };
}
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ user }, env_config_1.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign({ user }, env_config_1.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
//# sourceMappingURL=generate.tokens.util.js.map