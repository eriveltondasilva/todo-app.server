"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../config/constants");
const corsOptions = {
    origin: constants_1.APP_HOST,
};
/**
 * @class Middlewares
 * @desc A class that contains middlewares for the server
 **/
class Middlewares {
    /** @desc Adds middlewares to the Express application **/
    static use(App) {
        // App.use(cors(corsOptions))
        App.use((0, express_1.json)());
    }
}
// --------------------------
exports.default = Middlewares;
