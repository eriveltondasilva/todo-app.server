"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../app/services/response"));
const prisma_1 = __importDefault(require("../singletons/prisma"));
// --------------------------------------
class ControllerFactory {
    static create(Controller, Model) {
        const modelInstance = new Model(prisma_1.default);
        const responseInstance = new response_1.default();
        const controllerInstance = new Controller(responseInstance, modelInstance);
        // =>
        return controllerInstance;
    }
}
// --------------------------------------
exports.default = ControllerFactory;
