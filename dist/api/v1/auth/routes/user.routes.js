"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const csrfProtection_1 = require("../../../../utils/csrfProtection");
const registerUserHandler_1 = __importDefault(require("../handlers/registerUserHandler"));
const logOutUserHandler_1 = __importDefault(require("../handlers/logOutUserHandler"));
const forgetPasswordRequestHandler_1 = __importDefault(require("../handlers/forgetPasswordRequestHandler"));
const changePasswordHandler_1 = __importDefault(require("../handlers/changePasswordHandler"));
const confirmationHandler_1 = __importDefault(require("../handlers/confirmationHandler"));
const verifyTokenHandler_1 = __importDefault(require("../handlers/verifyTokenHandler"));
const passport_config_1 = __importDefault(require("../passport.config"));
const loggedinHandler_1 = __importDefault(require("../handlers/loggedinHandler"));
const authRouter = express_1.default.Router();
// registration route
authRouter.post("/register", 
// verifyCsrfProtection,
registerUserHandler_1.default);
// logout route 
authRouter.get("/logout", logOutUserHandler_1.default);
// forget password request route
authRouter.get("/forget-password", forgetPasswordRequestHandler_1.default);
// confirm registeration route
authRouter.get("/confirm-registeration", confirmationHandler_1.default);
// change password route
authRouter.post("/change-password", csrfProtection_1.verifyCsrfProtection, changePasswordHandler_1.default);
// verification route
authRouter.post("/verify-token", verifyTokenHandler_1.default);
// local route 1
// authRouter.post("/login/local", logInHandler);
// local route 2
authRouter.post("/login/local", passport_config_1.default.authenticate('local', { failureRedirect: '/login' }), loggedinHandler_1.default);
// facebook route
authRouter.get("/login/facebook", passport_config_1.default.authenticate('facebook', { failureRedirect: '/login', failureMessage: true, session: true }), function (req, res, next) {
    res.redirect("/dashboard");
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
authRouter.get("/oauth2/redirect/facebook", passport_config_1.default.authenticate('facebook', { failureRedirect: '/login', failureMessage: true, session: true }), function (req, res, next) {
    res.redirect("/dashboard");
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
// google route
authRouter.get('/login/google', passport_config_1.default.authenticate('google', { scope: ['profile'], failureRedirect: '/login', failureMessage: true, session: true }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
authRouter.get('/oauth2/redirect/google', passport_config_1.default.authenticate('google', { failureRedirect: '/login', failureMessage: true, session: true }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
// twitter route
authRouter.get('/login/twitter', passport_config_1.default.authenticate('twitter', { failureRedirect: '/login', session: true }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
authRouter.get('/oauth2/redirect/twitter', passport_config_1.default.authenticate('twitter', { failureRedirect: '/login', failureMessage: true, session: true }), function (req, res) {
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
// LinkedIn
authRouter.get('/login/linkedin', passport_config_1.default.authenticate('linkedin', { failureRedirect: '/login', session: true }), function (req, res) {
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
authRouter.get('/oauth2/redirect/linkedin', passport_config_1.default.authenticate('linkedin', { failureRedirect: '/login', failureMessage: true, session: true }), function (req, res) {
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
// apple
authRouter.get("/login/apple", passport_config_1.default.authenticate('apple'));
authRouter.get('/oauth2/redirect/apple', passport_config_1.default.authenticate('apple', { failureRedirect: '/login', failureMessage: true, session: true }), function (req, res) {
    res.redirect('/');
    // res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
});
// authRouter.post("/oauth2/redirect/apple", function(req, res, next) {
//     passport.authenticate('apple', function(err:any, user:any, info:any) {
//         if (err) {
//             if (err == "AuthorizationError") {
//                 res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
//                 <a href=\"/login\">Sign in with Apple</a>");
//             } else if (err == "TokenError") {
//                 res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
//                 <a href=\"/login\">Sign in with Apple</a>");
//             } else {
//                 res.send(err);
//             }
//         } else {
//             if (req.body.user) {
//                 // Get the profile info (name and email) if the person is registering
//                 res.json({
//                     user: req.body.user,
//                     idToken: user
//                 });
//             } else {
//                 res.json(user);
//             }			
//         }
//     })(req, res, next);
// });
exports.default = authRouter;
