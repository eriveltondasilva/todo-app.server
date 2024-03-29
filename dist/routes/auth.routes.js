"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const user_model_1 = __importDefault(require("../models/user.model"));
const response_service_1 = __importDefault(require("../app/services/response.service"));
const prisma_singleton_1 = __importDefault(require("../app/singletons/prisma.singleton"));
const auth_validator_1 = __importDefault(require("../app/validations/auth.validator"));
const router = (0, express_1.Router)();
const response = new response_service_1.default();
const userModel = new user_model_1.default(prisma_singleton_1.default);
const authController = new auth_controller_1.default(response, userModel);
const { loginValidation, registerValidation } = auth_validator_1.default;
router.post('/auth/register', loginValidation, authController.register);
router.post('/auth/login', registerValidation, authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/refresh-token', authController.refresh);
router.get('/auth/teste', (_, res) => {
    res.send('teste de rota auth!');
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map