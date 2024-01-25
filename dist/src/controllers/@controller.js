"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** --------------------------
 * @class BaseController
 * @desc Base Controller Class
 */
class Controller {
    constructor(response, model) {
        this.response = response;
        this.model = model;
        this.methods = this.getMethods(this);
        this.bindMethods();
    }
    //# CONTROLLER METHODS
    // --------------------------
    //* Get the list of methods in the derived class
    getMethods(instance) {
        const prototype = Object.getPrototypeOf(instance);
        const filteredMethods = (name) => typeof instance[name] === 'function' && name !== 'constructor';
        // =>
        return Object.getOwnPropertyNames(prototype).filter(filteredMethods);
    }
    //* Bind methods to the current instance
    bindMethods() {
        this.methods.forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }
}
// --------------------------
exports.default = Controller;
