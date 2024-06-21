"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccessTokenCookie = setAccessTokenCookie;
exports.setRefreshTokenCookie = setRefreshTokenCookie;
function setCookie(res, name, value) {
    return res.cookie(name, value, {
        httpOnly: true,
        secure: true,
        signed: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}
function setAccessTokenCookie(res, token) {
    return setCookie(res, 'accessToken', token);
}
function setRefreshTokenCookie(res, token) {
    return setCookie(res, 'refreshToken', token);
}
//# sourceMappingURL=set.signed.cookies.util.js.map