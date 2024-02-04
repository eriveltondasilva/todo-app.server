"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const rateLimitOptions = {
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
};
const morganOptions = 'tiny';
class Middlewares {
    static use(app) {
        app.use((0, express_1.json)());
        app.use((0, helmet_1.default)());
        app.use((0, morgan_1.default)(morganOptions));
        app.use((0, express_rate_limit_1.rateLimit)(rateLimitOptions));
    }
}
exports.default = Middlewares;
//# sourceMappingURL=index.js.map