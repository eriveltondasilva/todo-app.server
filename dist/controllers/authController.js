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
const generateTokens_1 = require("../app/utils/generateTokens");
const setSignedCookies_1 = require("../app/utils/setSignedCookies");
const _controller_1 = __importDefault(require("./@controller"));
class AuthController extends _controller_1.default {
    constructor(response, model) {
        super(response);
        this.response = response;
        this.model = model;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const existingUser = yield this.model.findByEmail(String(email));
                if (existingUser) {
                    return this.response.badRequest(res, { messages: 'user already exists' });
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
                return this.response.badRequest(res, { messages: 'error creating user' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const foundUser = yield this.model.findByEmail(String(email));
                if (!foundUser) {
                    this.response.unauthorized(res, { message: 'user not found' });
                }
                const isPasswordCorrect = yield bcrypt_1.default.compare(String(password), foundUser.password);
                if (!isPasswordCorrect) {
                    return this.response.unauthorized(res, { message: 'wrong password' });
                }
                delete foundUser.password;
                const { accessToken, refreshToken } = (0, generateTokens_1.generateTokens)(foundUser);
                (0, setSignedCookies_1.setAccessTokenCookie)(res, accessToken);
                (0, setSignedCookies_1.setRefreshTokenCookie)(res, refreshToken);
                res.status(200).json({ message: 'logged in successfully!', user: foundUser });
            }
            catch (error) {
                console.error(error);
                return this.response.serverError(res, { message: 'login failed' });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = req.signedCookies.access_token;
            if (!accessToken) {
                return this.response.unauthorized(res, { message: 'access denied' });
            }
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(200).json({ message: 'logged out successfully!' });
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.signedCookies.refresh_token;
            if (!refreshToken) {
                return this.response.badRequest(res, { messages: 'refresh token is required' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, constants_1.JWT_REFRESH_TOKEN_SECRET);
                const accessToken = (0, generateTokens_1.generateAccessToken)(decoded.user);
                (0, setSignedCookies_1.setAccessTokenCookie)(res, accessToken);
                res.status(200).json({ message: 'access token refreshed successfully!' });
            }
            catch (error) {
                console.error(error);
                return this.response.badRequest(res, { messages: 'error refreshing access token' });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map