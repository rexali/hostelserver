"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logInHandler;
const passport_config_1 = __importDefault(require("../passport.config"));
function logInHandler(req, res, next) {
    passport_config_1.default.authenticate('local', {
        failureRedirect: '/login',
        failureMessage: true,
        session: true,
    }, function (err, user, info, status) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(400).json({ status: "fail", data: { result: false, user: null }, message: "Login failed" });
            // return res.redirect('/signin') 
        }
        else {
            // set token cookie if you want e.g.,
            res.cookie("token", user?.token);
            req.session.isAuthenticated = true;
            req.user = { ...user };
            res.status(200).json({ status: "success", data: { token: user?.token }, message: "Login successful" });
            // res.redirect('/dashboard');
        }
    })(req, res, next);
}
