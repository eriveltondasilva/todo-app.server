"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerFactory_1 = __importDefault(require("../app/factories/controllerFactory"));
const auth_1 = __importDefault(require("../controllers/auth"));
const user_1 = __importDefault(require("../models/user"));
// ------------------------------------
//# Instances
const router = (0, express_1.Router)();
const authController = controllerFactory_1.default.create(auth_1.default, user_1.default);
// ------------------------------------
//# Auth Controller Methods
const { signup, login, logout } = authController;
// ------------------------------------
//# Middlewares
// ------------------------------------
//# Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
// ------------------------------------
exports.default = router;
