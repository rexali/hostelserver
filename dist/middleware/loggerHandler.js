"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerHandler = loggerHandler;
function loggerHandler(req, res, next) {
    console.log(req.method, ":", req.url, ":", new Date().getHours() + ":" + new Date().getMinutes());
    next();
}
