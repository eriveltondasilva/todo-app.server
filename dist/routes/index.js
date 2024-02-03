"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const taskRoutes_1 = __importDefault(require("./taskRoutes"));
class Routes {
    static use(app) {
        app.use(this.api, authRoutes_1.default);
        app.use(this.api, taskRoutes_1.default);
    }
}
Routes.api = '/api';
exports.default = Routes;
