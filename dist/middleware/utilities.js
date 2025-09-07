"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCsrfToken = getCsrfToken;
exports.authenticated = authenticated;
exports.requireAuthentication = requireAuthentication;
exports.auth = auth;
exports.logOut = logOut;
const config_1 = require("../config");
function getCsrfToken(req, res, next) {
    res.locals.token = req.csrfToken();
    res.cookie("_csrf2", req.csrfToken());
    next();
}
;
function authenticated(req, res, next) {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated) {
        res.locals.user = req.session.user;
    }
    next();
}
;
function requireAuthentication(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    }
    else {
        res.redirect(config_1.config.routes.login);
    }
}
;
function auth(username, password, session) {
    // hit database and check password with compare
    var isAuth = username === 'joshua' || username === 'brian';
    if (isAuth) {
        session.isAuthenticated = isAuth;
        session.user = { username: username };
    }
    return isAuth;
}
;
function logOut(session) {
    session.isAuthenticated = false;
    delete session.user;
}
;
