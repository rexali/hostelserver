"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_FACTOR = 10;
/**
 * Hash the user password
 * @param {string} userPassword
 * @returns a string of value
 */
function hashPassword(userPassword) {
    try {
        let salt = bcrypt_1.default.genSaltSync(SALT_FACTOR);
        let hashedPassword = bcrypt_1.default.hashSync(userPassword, salt);
        return hashedPassword; // store return hashedPassword in DB  
    }
    catch (error) {
        console.warn(error);
    }
}
/**
 * Check whether user credentials are valid
 * @param {string} hashedPassword
 * @param {string} userPassword
 * @returns a bolean value
 */
function checkPassword(userPassword, hashedPassword) {
    try {
        return bcrypt_1.default.compareSync(userPassword, hashedPassword); // return boolean
    }
    catch (error) {
        console.warn(error);
    }
}
