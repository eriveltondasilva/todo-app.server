"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const is_authenticated_mw_1 = __importDefault(require("../middlewares/is.authenticated.mw"));
const task_model_1 = __importDefault(require("../models/task.model"));
const response_service_1 = __importDefault(require("../app/services/response.service"));
const prisma_singleton_1 = __importDefault(require("../app/singletons/prisma.singleton"));
const task_validator_1 = __importDefault(require("../app/validations/task.validator"));
const router = (0, express_1.Router)();
const response = new response_service_1.default();
const taskModel = new task_model_1.default(prisma_singleton_1.default);
const taskController = new task_controller_1.default(response, taskModel);
const { createValidation, showValidation, updateValidation, destroyValidation, destroyManyValidation, } = task_validator_1.default;
router.use('*', is_authenticated_mw_1.default);
router.param('id', taskController.params);
router
    .route('/tasks')
    .get(taskController.index)
    .post(createValidation, taskController.create)
    .delete(destroyManyValidation, taskController.destroyMany);
router
    .route('/tasks/:id')
    .get(showValidation, taskController.show)
    .put(updateValidation, taskController.update)
    .delete(destroyValidation, taskController.destroy);
exports.default = router;
//# sourceMappingURL=task.routes.js.map