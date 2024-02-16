"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const public_routes_1 = __importDefault(require("./public.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
class Routes {
    static use(app) {
        app.use('/', public_routes_1.default);
        app.use('/api', auth_routes_1.default);
        app.use('/api', task_routes_1.default);
    }
}
exports.default = Routes;
//# sourceMappingURL=@index.routes.js.map