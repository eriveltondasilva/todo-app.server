"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_PARSER_SECRET = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_SECRET = exports.APP_HOST = exports.APP_PORT = exports.NODE_ENV = void 0;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.APP_PORT = Number(process.env.APP_PORT) || 3000;
exports.APP_HOST = process.env.APP_HOST || 'http://localhost:3000';
exports.JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'accessToken12345';
exports.JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshToken12345';
exports.COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET || 'cookieParser12345';
//# sourceMappingURL=env.js.map