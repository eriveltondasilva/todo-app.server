"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("../app/config/env");
const corsOptions = {
    origin: env_1.APP_HOST,
    credentials: true,
    maxAge: 15 * 60 * 1000,
};
const rateLimitOptions = {
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: 'You have exceeded the 100 requests in 15 min limit!',
    standardHeaders: true,
    legacyHeaders: false,
};
const morganOptions = 'dev';
class Middlewares {
    static use(app) {
        app.use((0, compression_1.default)());
        app.use((0, express_1.json)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)(corsOptions));
        app.use((0, cookie_parser_1.default)(env_1.COOKIE_PARSER_SECRET));
        app.use((0, morgan_1.default)(morganOptions));
        app.use((0, express_rate_limit_1.rateLimit)(rateLimitOptions));
    }
}
exports.default = Middlewares;
//# sourceMappingURL=index.js.map