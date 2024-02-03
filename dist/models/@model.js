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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model[this.modelName].findMany();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id) || id <= 0)
                throw new Error(`Invalid ${this.modelName} ID`);
            const item = yield this.model[this.modelName].findUnique({
                where: {
                    id,
                },
            });
            if (!item)
                throw new Error(`${this.modelName} not found`);
            return item;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model[this.modelName].create({
                data,
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id) || id <= 0)
                throw new Error(`Invalid ${this.modelName} ID`);
            const item = yield this.model[this.modelName].update({
                where: {
                    id,
                },
                data,
            });
            if (!item)
                throw new Error(`${this.modelName} not found`);
            return item;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id) || id <= 0)
                throw new Error(`Invalid ${this.modelName} ID`);
            return yield this.model[this.modelName].delete({
                where: {
                    id,
                },
            });
        });
    }
    destroyManyById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(data))
                throw new Error('Invalid data');
            if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
                return yield this.model[this.modelName].deleteMany({});
            }
            return yield this.model[this.modelName].deleteMany({
                where: {
                    id: { in: data },
                },
            });
        });
    }
}
exports.default = Model;
//# sourceMappingURL=@model.js.map