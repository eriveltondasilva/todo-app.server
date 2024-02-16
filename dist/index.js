"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const _index_mw_1 = __importDefault(require("./middlewares/@index.mw"));
const error_handler_mw_1 = __importDefault(require("./middlewares/error.handler.mw"));
const _index_routes_1 = __importDefault(require("./routes/@index.routes"));
const server_1 = __importDefault(require("./server"));
const app = (0, express_1.default)();
_index_mw_1.default.use(app);
_index_routes_1.default.use(app);
error_handler_mw_1.default.use(app);
server_1.default.start(app);
//# sourceMappingURL=index.js.map