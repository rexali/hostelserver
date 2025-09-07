"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (err.code === "EBADCSRFTOKEN") {
        // log error
        console.warn("CSRF token mismatch");
        res.status(403);
        res.send("Form tampered with");
    }
    else {
        console.log(err);
        res.status(500).send('Something broke. What did you do?');
    }
}
;
