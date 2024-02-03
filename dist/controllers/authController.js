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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../app/config/constants");
const _controller_1 = __importDefault(require("./@controller"));
class AuthController extends _controller_1.default {
    constructor(response, model) {
        super(response, model);
        this.response = response;
        this.model = model;
        this.errors = {
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
            if (!email || !password) {
                return this.response.badRequest(res, this.errors.validation);
            }
            const existingUser = yield this.model.findByEmail(String(email));
            if (existingUser) {
                return this.response.badRequest(res, this.errors.userExists);
            }
            try {
                const hashedPassword = yield bcrypt_1.default.hash(String(password), 8);
                const newUser = yield this.model.create({
                    name: String(name || ''),
                    email: String(email),
                    password: hashedPassword,
                });
                const userSubset = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                };
                return this.response.created(res, userSubset);
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, this.errors.createUser);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return this.response.unauthorized(res, this.errors.validation);
            }
            const foundUser = yield this.model.findByEmail(String(email));
            if (!foundUser) {
                return this.response.unauthorized(res, this.errors.userNotFound);
            }
            const isPasswordCorrect = yield bcrypt_1.default.compare(String(password), foundUser.password);
            if (!isPasswordCorrect) {
                return this.response.unauthorized(res, this.errors.wrongPassword);
            }
            try {
                const token = jsonwebtoken_1.default.sign({ id: foundUser.id, email: foundUser.email }, constants_1.SECRET_JWT, { expiresIn: '1h' });
                return this.response.ok(res, { token });
            }
            catch (error) {
                console.error(error);
                return this.response.serverError(res, this.errors.login);
            }
        });
    }
    logout(_, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = AuthController;
