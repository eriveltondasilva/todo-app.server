"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../../controllers/authController"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const response_1 = __importDefault(require("../../app/services/response"));
const prisma_1 = __importDefault(require("../../app/singletons/prisma"));
const router = (0, express_1.Router)();
const response = new response_1.default();
const userModel = new userModel_1.default(prisma_1.default);
const authController = new authController_1.default(response, userModel);
const { signup, login, logout } = authController;
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
exports.default = router;
