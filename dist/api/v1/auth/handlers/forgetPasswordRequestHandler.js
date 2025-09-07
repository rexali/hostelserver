"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = forgetPasswordRequestHandler;
const joi_1 = __importDefault(require("joi"));
const uuid_1 = require("uuid");
const registerationMSQ_1 = require("../utils/registerationMSQ");
const auth_controller_1 = require("../controllers/auth.controller");
const sendMail_1 = require("../../../../utils/sendMail");
/**
 * Request a user password change
 * @param req - a request object
 * @param res - a response object
 * @returns void
 */
async function forgetPasswordRequestHandler(req, res) {
    try {
        const { email } = req.body;
        // let us validate user data
        const userDataSchema = joi_1.default.object().keys({
            email: joi_1.default.string().required,
        });
        // validate data
        const result = userDataSchema.validate(req.body);
        if (result.error) {
            res.json({ status: "fail", data: null, message: "Error: " + result.error.details });
        }
        else {
            const userData = {
                // escape the email
                username: escape(email)
            };
            // genrate random code
            const code = (0, uuid_1.v4)();
            //  html message
            const html = (0, registerationMSQ_1.registrationMSQ)(email, code);
            // check if user exist
            let user = await auth_controller_1.AuthService.getUser({ username: userData.username });
            if (user === null) {
                res.json({ status: "fail", data: null, message: "Email does not exist" });
            }
            else {
                const user = await auth_controller_1.AuthService.updateUserCode({ username: email, code: code });
                if (user === null) {
                    res.json({ status: "fail", data: null, message: "Error: Try again" });
                }
                else {
                    const result = await (0, sendMail_1.sendMail)(email, "Change..", "html", "Homes4U", html);
                    if (result) {
                        res.json({ status: "success", data: { result: true }, message: "Check your mail inbox" });
                    }
                    else {
                        res.json({ status: "fail", data: { result: false }, message: "Error: Try again" });
                    }
                }
            }
        }
    }
    catch (error) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + Error });
    }
}
