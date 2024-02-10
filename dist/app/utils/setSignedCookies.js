"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = exports.setAccessTokenCookie = void 0;
function setCookie(res, name, value) {
    return res.cookie(name, value, {
        httpOnly: true,
        secure: false,
        signed: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}
function setAccessTokenCookie(res, token) {
    return setCookie(res, 'accessToken', token);
}
exports.setAccessTokenCookie = setAccessTokenCookie;
function setRefreshTokenCookie(res, token) {
    return setCookie(res, 'refreshToken', token);
}
exports.setRefreshTokenCookie = setRefreshTokenCookie;
//# sourceMappingURL=setSignedCookies.js.map