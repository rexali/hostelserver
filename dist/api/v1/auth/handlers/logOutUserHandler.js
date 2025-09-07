"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logOutUserHandler;
function logOutUserHandler(req, res) {
    req.logout({}, function (err) {
        console.log(err);
    });
    req.session.isAuthenticated = false;
    delete req.session.user;
    req.session.destroy(function (err) {
        console.log(err);
    });
    res.status(200).json({ status: 'success', data: null, messsage: 'Logged out' });
    // res.redirect("/")
}
