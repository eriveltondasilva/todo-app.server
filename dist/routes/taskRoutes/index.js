"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../../controllers/taskController"));
const validateToken_1 = __importDefault(require("../../app/middlewares/validateToken"));
const taskModel_1 = __importDefault(require("../../models/taskModel"));
const response_1 = __importDefault(require("../../app/services/response"));
const prisma_1 = __importDefault(require("../../app/singletons/prisma"));
const router = (0, express_1.Router)();
const response = new response_1.default();
const taskModel = new taskModel_1.default(prisma_1.default);
const taskController = new taskController_1.default(response, taskModel);
const { index, show, create, update, destroy, destroyMany } = taskController;
router.use(validateToken_1.default);
router.route('/tasks')
    .get(index)
    .post(create)
    .delete(destroyMany);
router.route('/tasks/:id')
    .get(show)
    .put(update)
    .delete(destroy);
exports.default = router;
//# sourceMappingURL=index.js.map