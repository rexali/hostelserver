"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loggedinHandler;
function loggedinHandler(req, res, next) {
    try {
        if (!req.user) {
            res.status(400).json({ status: "success", data: { result: false, user: null }, message: "Login failed" });
            // return res.redirect('/login') 
        }
        else {
            // set token cookie if you want e.g.,
            const userToken = req.user;
            res.cookie("token", userToken.token);
            req.session.isAuthenticated = true;
            res.status(200).json({ status: "success", data: { result: true, user: req.user }, message: "Login successful" });
            // res.redirect('/dashboard');
        }
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ status: "fail", data: { result: false, user: null }, message: "Login failed" });
        // res.redirect('/login');
    }
}
