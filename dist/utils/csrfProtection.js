"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCsrfProtection = createCsrfProtection;
exports.verifyCsrfProtection = verifyCsrfProtection;
const csrf_token_1 = __importDefault(require("csrf-token"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function createCsrfProtection(req, res, next) {
    try {
        const token = await csrf_token_1.default.create(process.env["SECRET_KEY"], 8);
        res.status(200).json({ status: "success", data: { token }, message: "Valid token" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error });
    }
}
async function verifyCsrfProtection(req, res, next) {
    const { _csrf } = req.body;
    try {
        if (await csrf_token_1.default.verify(process.env["SECRET_KEY"], _csrf)) {
            next();
        }
        else {
            res.status(401).json({ status: "fail", data: null, message: "Invalid token" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: Verification failed - " + error });
    }
}
