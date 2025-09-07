"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
function notFoundHandler(req, res, next) {
    res.status(404).send('You seem lost. Page not found.');
}
