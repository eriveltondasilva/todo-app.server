"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_HOST = exports.APP_PORT = void 0;
exports.APP_PORT = Number(process.env.APP_PORT) || 3000;
exports.APP_HOST = process.env.APP_HOST || '';
