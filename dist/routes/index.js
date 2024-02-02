"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const task_1 = __importDefault(require("./task"));
/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 **/
class Routes {
    /** @desc Initializes and returns an array of Router instances. **/
    static initializeRoutes() {
        return [task_1.default, auth_1.default];
    }
    /** @desc Configures the routes for the Express app. **/
    static use(app) {
        app.use('/api', Routes.initializeRoutes());
    }
}
// --------------------------
exports.default = Routes;
