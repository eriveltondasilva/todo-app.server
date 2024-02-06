"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_SECRET = exports.APP_HOST = exports.APP_PORT = void 0;
exports.APP_PORT = Number(process.env.APP_PORT) || 3000;
exports.APP_HOST = process.env.APP_HOST || 'http://localhost:3000';
exports.JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'accessToken12345';
exports.JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshToken12345';
//# sourceMappingURL=constants.js.map