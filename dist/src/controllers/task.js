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
const _controller_1 = __importDefault(require("./@controller"));
/**
 * @class Todo Controller Class
 * @desc description
 **/
class TaskController extends _controller_1.default {
    //   constructor() {}
    //# TO-DO CONTROLLER METHODS
    // --------------------------
    //* Retrieve all task items
    index(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.model.findAll();
                return this.response.ok(res, tasks);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    //* Find a task by its ID
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const message = { error: 'Task not found' };
            try {
                const task = yield this.model.findById(Number(id));
                return this.response.ok(res, task);
            }
            catch (error) {
                console.error(error);
                return this.response.notFound(res, message);
            }
        });
    }
    //* Create a new task item
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const message = { error: 'Task not created' };
            try {
                const task = yield this.model.create(body);
                return this.response.created(res, task);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, message);
            }
        });
    }
    //* Update a task item
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            const message = { error: 'Task not updated' };
            try {
                const task = yield this.model.update(Number(id), body);
                return this.response.ok(res, task);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, message);
            }
        });
    }
    //* Delete a task item.
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const message = { error: 'Task not deleted' };
            try {
                yield this.model.deleteById(Number(id));
                return this.response.noContent(res);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, message);
            }
        });
    }
    //* Delete a task item.
    destroyMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const message = { error: 'Tasks not deleted' };
            try {
                yield this.model.destroyManyById(ids);
                return this.response.noContent(res);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, message);
            }
        });
    }
}
// --------------------------
exports.default = TaskController;
