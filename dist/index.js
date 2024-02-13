"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = __importDefault(require("./middlewares"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const server_1 = __importDefault(require("./server"));
const app = (0, express_1.default)();
middlewares_1.default.use(app);
routes_1.default.use(app);
errorHandler_1.default.use(app);
server_1.default.start(app);
//# sourceMappingURL=index.js.map