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
const apiError_1 = require("../app/services/apiError");
const generateTokens_1 = require("../app/utils/generateTokens");
const setSignedCookies_1 = require("../app/utils/setSignedCookies");
const _controller_1 = __importDefault(require("./@controller"));
class AuthController extends _controller_1.default {
    constructor(response, model) {
        super(response);
        this.response = response;
        this.model = model;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const existingUser = yield this.model.findByEmail(String(email));
                if (existingUser) {
                    throw new apiError_1.ConflictError('user already exists');
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
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const foundUser = yield this.model.findByEmail(String(email));
                if (!foundUser) {
                    throw new apiError_1.UnauthorizedError("user's email not found");
                }
                const isPasswordCorrect = yield bcrypt_1.default.compare(String(password), foundUser.password);
                if (!isPasswordCorrect) {
                    throw new apiError_1.UnauthorizedError("user's password is incorrect");
                }
                delete foundUser.password;
                const { accessToken, refreshToken } = (0, generateTokens_1.generateTokens)(foundUser);
                (0, setSignedCookies_1.setAccessTokenCookie)(res, accessToken);
                (0, setSignedCookies_1.setRefreshTokenCookie)(res, refreshToken);
                const date = new Date().toLocaleTimeString();
                return this.response.ok(res, {
                    message: 'logged in successfully!',
                    date,
                    user: foundUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken } = req.signedCookies;
                if (!accessToken) {
                    throw new apiError_1.UnauthorizedError('access token not found');
                }
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                return this.response.ok(res, {
                    message: 'logged out successfully!',
                    date: new Date().toLocaleTimeString(),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.signedCookies;
                if (!refreshToken) {
                    throw new apiError_1.UnauthorizedError('refresh token not found');
                }
                const decoded = jsonwebtoken_1.default.verify(refreshToken, constants_1.JWT_REFRESH_TOKEN_SECRET);
                const accessToken = (0, generateTokens_1.generateAccessToken)(decoded.user);
                (0, setSignedCookies_1.setAccessTokenCookie)(res, accessToken);
                const date = new Date().toLocaleTimeString();
                return this.response.ok(res, {
                    message: 'access token refreshed successfully!',
                    date,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map