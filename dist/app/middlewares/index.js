"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Middlewares {
    static use(App) {
        App.use((0, express_1.json)());
    }
}
exports.default = Middlewares;
