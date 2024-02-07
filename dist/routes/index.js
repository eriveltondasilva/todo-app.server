"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const publicRoutes_1 = __importDefault(require("./publicRoutes"));
const taskRoutes_1 = __importDefault(require("./taskRoutes"));
class Routes {
    static use(app) {
        app.use(publicRoutes_1.default);
        app.use('/api', authRoutes_1.default);
        app.use('/api', taskRoutes_1.default);
    }
}
exports.default = Routes;
//# sourceMappingURL=index.js.map