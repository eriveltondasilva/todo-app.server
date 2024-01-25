"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
/**
 * @class PrismaSingleton
 * @desc Singleton class for PrismaClient instance
 */
class PrismaSingleton {
    constructor() { }
    static getInstance() {
        if (!(PrismaSingleton === null || PrismaSingleton === void 0 ? void 0 : PrismaSingleton.instance)) {
            PrismaSingleton.instance = new client_1.PrismaClient();
        }
        // => Prevent multiple instances
        return PrismaSingleton.instance;
    }
}
// ------------------------------------
const prismaSingleton = PrismaSingleton.getInstance();
exports.default = prismaSingleton;
