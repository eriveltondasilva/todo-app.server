"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class PrismaSingleton {
    constructor() { }
    static getInstance() {
        if (!(PrismaSingleton === null || PrismaSingleton === void 0 ? void 0 : PrismaSingleton.instance)) {
            PrismaSingleton.instance = new client_1.PrismaClient();
        }
        return PrismaSingleton.instance;
    }
}
const prismaSingleton = PrismaSingleton.getInstance();
exports.default = prismaSingleton;
//# sourceMappingURL=prisma.js.map