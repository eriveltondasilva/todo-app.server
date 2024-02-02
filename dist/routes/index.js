"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const taskRoutes_1 = __importDefault(require("./taskRoutes"));
class Routes {
    static initializeRoutes() {
        return [taskRoutes_1.default, authRoutes_1.default];
    }
    static use(app) {
        app.use('/api', Routes.initializeRoutes());
    }
}
exports.default = Routes;
