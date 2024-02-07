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
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(model) {
        this.model = model;
        this.modelName = this.constructor.name.toLowerCase().replace('model', '');
    }
    findAll(authUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model[this.modelName].findMany({
                where: {
                    user_id: authUserId,
                },
            });
        });
    }
    findById(itemId, authUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.model[this.modelName].findUnique({
                where: {
                    id: itemId,
                    user_id: authUserId,
                },
            });
            if (!item)
                throw new Error(`${this.modelName} not found`);
            return item;
        });
    }
    create(body, authUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model[this.modelName].create({
                data: Object.assign(Object.assign({}, body), { user_id: authUserId }),
            });
        });
    }
    update(itemId, body, authUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.model[this.modelName].update({
                where: {
                    id: itemId,
                    user_id: authUserId,
                },
                data: body,
            });
            if (!item)
                throw new Error(`${this.modelName} not found`);
            return item;
        });
    }
    deleteById(itemId, authUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model[this.modelName].delete({
                where: {
                    id: itemId,
                    user_id: authUserId,
                },
            });
        });
    }
    destroyManyById(itemIds, authUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model[this.modelName].deleteMany({
                where: {
                    id: { in: itemIds },
                    user_id: authUserId,
                },
            });
        });
    }
}
exports.default = Model;
//# sourceMappingURL=@model.js.map