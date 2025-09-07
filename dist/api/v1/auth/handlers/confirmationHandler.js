"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = confirmRegisterationHandler;
const joi_1 = __importDefault(require("joi"));
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * Confirm a user registration
 * @param req - a request object
 * @param res - a response object
 * @returns void
 */
async function confirmRegisterationHandler(req, res) {
    try {
        //  user data schema
        const userDataSchema = joi_1.default.object().keys({
            email: joi_1.default.string().required,
            code: joi_1.default.string().required,
        });
        const { email, code, } = req.body;
        // validate now
        const result = userDataSchema.validate(req.body);
        if (!result.error) {
            // user data
            const userData = {
                // escape data
                username: escape(email),
                code: escape(code),
            };
            let user = await auth_controller_1.AuthService.getUser({ username: userData.username, code: userData.code });
            if (user === null) {
                res.json({ status: "fail", data: { result: false }, message: "Confirmation fail" });
            }
            else {
                res.json({ status: "success", data: { result: true }, message: "Registeration confirmed successfully" });
            }
        }
        else {
            res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
        }
    }
    catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + Error });
    }
}
