"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("./task"));
/** --------------------------
 * @class Routes
 * @desc Routes class handles the configuration of routes for the Express app.
 **/
class Routes {
    /** @desc Configures the routes for the Express app **/
    static use(app) {
        app.use('/api', task_1.default);
        // App.use('/api', [])
    }
}
// --------------------------
exports.default = Routes;
