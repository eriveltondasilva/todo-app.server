"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("./base.controller"));
class TaskController extends base_controller_1.default {
    constructor(response, model) {
        super(response);
        this.response = response;
        this.model = model;
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUserId = Number(req.user.id);
            try {
                const tasks = yield this.model.findAll(authUserId);
                return this.response.ok(res, tasks);
            }
            catch (error) {
                next(error);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const authUserId = Number(req.user.id);
            try {
                const task = yield this.model.findById(id, authUserId);
                return this.response.ok(res, task);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUserId = Number(req.user.id);
            const body = req.body;
            body.is_completed = body.is_completed === 'true';
            try {
                const task = yield this.model.create(body, authUserId);
                return this.response.created(res, task);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const authUserId = Number(req.user.id);
            const body = req.body;
            body.is_completed = body.is_completed === 'true';
            try {
                const task = yield this.model.update(id, body, authUserId);
                return this.response.ok(res, task);
            }
            catch (error) {
                next(error);
            }
        });
    }
    destroy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const authUserId = Number(req.user.id);
            try {
                yield this.model.deleteById(id, authUserId);
                return this.response.noContent(res);
            }
            catch (error) {
                next(error);
            }
        });
    }
    destroyMany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authUserId = Number(req.user.id);
                const taskIds = req.body.ids.map((id) => {
                    const taskId = Number(id);
                    if (isNaN(taskId) || taskId <= 0)
                        throw new Error('Invalid task ID');
                    return taskId;
                });
                yield this.model.destroyManyById(taskIds, authUserId);
                return this.response.noContent(res);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = TaskController;
//# sourceMappingURL=task.controller.js.map