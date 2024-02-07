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
const express_validator_1 = require("express-validator");
const _controller_1 = __importDefault(require("./@controller"));
class TaskController extends _controller_1.default {
    constructor(response, model) {
        super(response);
        this.response = response;
        this.model = model;
    }
    index(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const authUserId = Number(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 1);
            console.log(req.user);
            try {
                const tasks = yield this.model.findAll(authUserId);
                return this.response.ok(res, tasks);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    show(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const authUserId = Number(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 1);
            const message = { error: 'Task not found' };
            try {
                const task = yield this.model.findById(id, authUserId);
                return this.response.ok(res, task);
            }
            catch (error) {
                console.error(error);
                return this.response.notFound(res, message);
            }
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const authUserId = Number(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 1);
                const result = (0, express_validator_1.validationResult)(req);
                if (!result.isEmpty()) {
                    return this.response.badRequest(res, { message: result.array()[0].msg });
                }
                const task = yield this.model.create(body, authUserId);
                return this.response.created(res, task);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, { message: 'Task not created' });
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const authUserId = Number(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 1);
                const body = req.body;
                const result = (0, express_validator_1.validationResult)(req);
                if (!result.isEmpty()) {
                    return this.response.badRequest(res, { message: result.array()[0].msg });
                }
                const task = yield this.model.update(id, body, authUserId);
                return this.response.ok(res, task);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, { message: 'Task not updated' });
            }
        });
    }
    destroy(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const authUserId = Number(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 1);
            const message = { error: 'Task not deleted' };
            try {
                yield this.model.deleteById(id, authUserId);
                return this.response.noContent(res);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, message);
            }
        });
    }
    destroyMany(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const taskIds = req.body.ids;
            const authUserId = Number(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 1);
            const message = { error: 'Tasks not deleted' };
            try {
                yield this.model.destroyManyById(taskIds, authUserId);
                return this.response.noContent(res);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, message);
            }
        });
    }
}
exports.default = TaskController;
//# sourceMappingURL=taskController.js.map