"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../app/config/constants");
const generateTokens_1 = __importStar(require("../app/utils/generateTokens"));
const _controller_1 = __importDefault(require("./@controller"));
class AuthController extends _controller_1.default {
    constructor(response, model) {
        super(response);
        this.response = response;
        this.model = model;
        this.messages = {
            createUser: 'Error creating user',
            userExists: 'User already exists',
            userNotFound: 'User not found',
            validation: 'Email and password are required',
            wrongPassword: 'Wrong password',
            login: 'Login failed',
        };
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const existingUser = yield this.model.findByEmail(String(email));
                if (existingUser) {
                    return this.response.badRequest(res, { messages: this.messages.userExists });
                }
                const hashedPassword = yield bcrypt_1.default.hash(String(password), 8);
                const newUser = yield this.model.create({
                    name: String(name || ''),
                    email: String(email),
                    password: hashedPassword,
                });
                delete newUser.password;
                return this.response.created(res, newUser);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, { messages: this.messages.createUser });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const foundUser = yield this.model.findByEmail(String(email));
                if (!foundUser) {
                    this.response.unauthorized(res, { message: this.messages.userNotFound });
                }
                const isPasswordCorrect = yield bcrypt_1.default.compare(String(password), foundUser.password);
                if (!isPasswordCorrect) {
                    return this.response.unauthorized(res, { message: this.messages.wrongPassword });
                }
                delete foundUser.password;
                const tokens = (0, generateTokens_1.default)(foundUser);
                this.response.ok(res, tokens);
            }
            catch (error) {
                console.error(error);
                return this.response.serverError(res, { message: this.messages.login });
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return this.response.badRequest(res, { messages: 'Refresh token is required' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, constants_1.JWT_REFRESH_TOKEN_SECRET);
                const accessToken = (0, generateTokens_1.generateAccessToken)(decoded);
                return this.response.ok(res, { accessToken });
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, { messages: 'Error refreshing access token' });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map