"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerFactory_1 = __importDefault(require("../app/factories/controllerFactory"));
const task_1 = __importDefault(require("../controllers/task"));
const task_2 = __importDefault(require("../models/task"));
// ------------------------------------
//# Instances
const router = (0, express_1.Router)();
// ------------------------------------
//# Todo Controller Methods
const taskController = controllerFactory_1.default.create(task_1.default, task_2.default);
const { index, show, create, update, destroy, destroyMany } = taskController;
// ------------------------------------
//# Middlewares
// router.use()
// ------------------------------------
//# Todo Routes
// prettier-ignore
router.route('/tasks')
    .get(index)
    .post(create)
    .delete(destroyMany);
// prettier-ignore
router.route('/tasks/:id')
    .get(show)
    .put(update)
    .delete(destroy);
// ------------------------------------
exports.default = router;
