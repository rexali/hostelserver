"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).json({ status: "fail", data: null, message: "Error: " + err });
}
