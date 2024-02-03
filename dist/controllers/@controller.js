"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(response, model) {
        this.response = response;
        this.model = model;
        this.methods = this.getMethods(this);
        this.bindMethods();
    }
    getMethods(instance) {
        const prototype = Object.getPrototypeOf(instance);
        const filteredMethods = (name) => typeof instance[name] === 'function' && name !== 'constructor';
        return Object.getOwnPropertyNames(prototype).filter(filteredMethods);
    }
    bindMethods() {
        this.methods.forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }
}
exports.default = Controller;
//# sourceMappingURL=@controller.js.map