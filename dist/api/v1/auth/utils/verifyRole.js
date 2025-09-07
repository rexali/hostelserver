"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = verifyRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyRole(req, res, next) {
    try {
        const bearerToken = req.headers["authorization"];
        const token = bearerToken?.split(" ")[1] ?? "";
        if (!token) {
            return false;
        }
        else {
            const decoded = jsonwebtoken_1.default.verify(token, process.env['SECRET_KEY']);
            if (decoded.role === "admin" && decoded.permission.includes("write")) {
                next();
            }
            else {
                res.status(401).json({ status: "failure", data: null, message: "Unauthorised" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
