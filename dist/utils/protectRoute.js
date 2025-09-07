"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const protectRoute = (req, res, next) => {
    try {
        const bearerToken = req.headers["authorization"];
        const token = bearerToken?.split(" ")[1] ?? "";
        if (!token) {
            res.status(401).json({ status: "success", data: null, message: "Access denied" });
        }
        else {
            const decoded = jsonwebtoken_1.default.verify(token, process.env['SECRET_KEY']);
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ status: "fail", data: null, message: "Invalid token: " + error });
    }
};
exports.protectRoute = protectRoute;
