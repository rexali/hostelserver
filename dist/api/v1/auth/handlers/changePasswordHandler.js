"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = changePasswordHandler;
const joi_1 = __importDefault(require("joi"));
const auth_controller_1 = require("../controllers/auth.controller");
const hashCheckPassword_1 = require("../utils/hashCheckPassword");
const html_escaper_1 = require("html-escaper");
/**
 * Change a user password
 * @param req - a request object
 * @param res - a response object
 * @returns void
 */
async function changePasswordHandler(req, res) {
    try {
        // let us validate user data
        const userDataSchema = joi_1.default.object().keys({
            username: joi_1.default.string().required,
            password: joi_1.default.string().required,
            code: joi_1.default.string().required
        });
        const { username, password, code, } = req.body;
        // validate data
        const result = userDataSchema.validate(req.body);
        // check
        if (!result.error) {
            // escape data
            const userData = {
                username: (0, html_escaper_1.escape)(username),
                password: (0, html_escaper_1.escape)(password),
                code: (0, html_escaper_1.escape)(code)
            };
            let user = await auth_controller_1.AuthService.getUser({ username: userData.username, code: userData.code });
            if (user === null) {
                res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
            }
            else {
                let userResult = await auth_controller_1.AuthService.updateUserPassword({ password: (0, hashCheckPassword_1.hashPassword)(userData.password), username: userData.username });
                if (userResult[0]) {
                    res.json({ status: "success", data: { result: true }, message: "Password successfully changed" });
                }
                else {
                    res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
                }
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
