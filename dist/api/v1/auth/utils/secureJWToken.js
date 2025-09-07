"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.padToken = padToken;
exports.unpadToken = unpadToken;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function padToken(initialToken) {
    try {
        // const splitToken = initialToken.split('.');
        // const tokenStartPart = splitToken[0]; 
        // const padTokenStartPart = tokenStartPart.concat(process.env.TOKEN_SECRET_PART as string);
        // const tokenEndPart = splitToken[splitToken.length - 1];
        // const joinedTokenParts = [padTokenStartPart,tokenEndPart].join('.')
        // return joinedTokenParts;
        const secretPart = process.env.TOKEN_SECRET_PART;
        const finalToken = initialToken.concat(secretPart);
        return finalToken;
    }
    catch (error) {
        console.warn(error);
    }
}
function unpadToken(paddedToken) {
    try {
        // const splitToken = paddedToken.split('.');
        // const tokenStartPart = splitToken[0];
        // const requiredPartLength = tokenStartPart.length - (process.env.TOKEN_SECRET_PART as unknown as string).length;
        // const realTokenStartPart = paddedToken.slice(0, requiredPartLength);
        // const joinedTokenParts = [realTokenStartPart, splitToken[1]].join('.');
        // return joinedTokenParts;
        const secretPart = process.env.TOKEN_SECRET_PART;
        const requiredPartLength = paddedToken.length - secretPart.length;
        const realToken = paddedToken.slice(0, requiredPartLength);
        return realToken;
    }
    catch (error) {
        console.warn(error);
    }
}
