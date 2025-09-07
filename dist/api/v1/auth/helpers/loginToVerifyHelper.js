"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginToVerifyUser = loginToVerifyUser;
exports.verifyUserCredentials = verifyUserCredentials;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const hashCheckPassword_1 = require("../utils/hashCheckPassword");
const user_model_1 = __importDefault(require("../models/user.model"));
const html_escaper_1 = require("html-escaper");
/**
 * Log in to verify user credentials
 * @param username email of the user
 * @param password password of the user
 * @param done a callback
 */
function loginToVerifyUser(username, password, done) {
    // let us sanitise
    const userDataSchema = joi_1.default.object().keys({
        username: joi_1.default.string().required,
        password: joi_1.default.string().required,
    });
    const validationResult = userDataSchema.validate({ username, password });
    if (validationResult.error) {
        if (validationResult.error)
            return done(null, false, validationResult.error.details);
    }
    else {
        // let us sanitise user data now
        try {
            const userData = {
                username: (0, html_escaper_1.escape)(username),
                password: (0, html_escaper_1.escape)(password),
            };
            user_model_1.default.findOne({ where: { username: userData.username } }).then((user) => {
                if (!user) {
                    return done(null, false, { message: "Incorrect Username or password" });
                }
                if (!(0, hashCheckPassword_1.checkPassword)(userData.password, user.password)) {
                    return done(null, false, { message: "Incorrect Username or password" });
                }
                const token = jsonwebtoken_1.default.sign({
                    userId: user.id,
                    role: user.role,
                    permission: user.permission
                }, process.env["SECRET_KEY"], { expiresIn: '1h' });
                const userPlusToken = { username, status: user.status, code: user.code, token };
                return done(null, userPlusToken);
            }).catch(err => {
                if (err) {
                    return done(err);
                }
                ;
            });
        }
        catch (err) {
            console.log(err);
            if (err) {
                return done(err);
            }
            ;
        }
    }
}
/**
 * Verify user credentials
 * @param username email of the user
 * @param password password of the user
 * @param done a callback
 */
async function verifyUserCredentials(username, password, done) {
    user_model_1.default.findOne({ where: { username: username } }).then((user) => {
        if (!user)
            return done(null, false, { message: "Incorrect Username or password" });
        if (!(0, hashCheckPassword_1.checkPassword)(password, user.password))
            return done(null, false, { message: "Incorrect Username or password" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role, permission: user.permission }, process.env["SECRET_KEY"], { expiresIn: '1h' });
        const userPlusToken = { username, status: user.status, code: user.code, token };
        return done(null, userPlusToken);
    }).catch((err) => {
        if (err)
            return done(err);
    });
}
