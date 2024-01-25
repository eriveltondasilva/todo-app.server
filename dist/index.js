"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("./app/middlewares"));
const routes_1 = __importDefault(require("./routes"));
const server_1 = __importDefault(require("./server"));
// ====================================
//* Create instance of Express application
const app = (0, express_1.default)();
// ------------------------------------
//* Use the middlewares defined in the Middlewares module
middlewares_1.default.use(app);
// ------------------------------------
//* Use the routes defined in the Routes module
routes_1.default.use(app);
// ------------------------------------
//* Start the server
server_1.default.start(app);
