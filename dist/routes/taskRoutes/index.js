"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../../controllers/taskController"));
const taskValidation_1 = __importDefault(require("../../middlewares/validations/taskValidation"));
const taskModel_1 = __importDefault(require("../../models/taskModel"));
const response_1 = __importDefault(require("../../app/services/response"));
const prisma_1 = __importDefault(require("../../app/singletons/prisma"));
const router = (0, express_1.Router)();
const response = new response_1.default();
const taskModel = new taskModel_1.default(prisma_1.default);
const taskController = new taskController_1.default(response, taskModel);
router
    .route('/tasks')
    .get(taskController.index)
    .post(taskValidation_1.default.create, taskController.create)
    .delete(taskValidation_1.default.destroyMany, taskController.destroyMany);
router
    .route('/tasks/:id')
    .get(taskValidation_1.default.show, taskController.show)
    .put(taskValidation_1.default.update, taskController.update)
    .delete(taskValidation_1.default.destroy, taskController.destroy);
exports.default = router;
//# sourceMappingURL=index.js.map