"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhookData = void 0;
// import crypto from 'crypto';
const dotenv = require('dotenv');
dotenv.config();
// get paystack payment response
const getWebhookData = async (req, res) => {
    try {
        const { createHmac } = await Promise.resolve().then(() => __importStar(require('node:crypto')));
        const secret = process.env.SECRET_KEY;
        // check to make sure the ip is from paystack
        if (["52.31.139.75", "52.49.173.169", "52.214.14.220"].includes(req.ip)) {
            const hash = createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
            if (hash == req.headers['x-paystack-signature']) {
                const eventData = req.body;
                // do something with the response like entering the return data to database
                console.log(eventData);
                res.status(200).json(eventData);
            }
        }
    }
    catch (error) {
        console.warn(error);
    }
};
exports.getWebhookData = getWebhookData;
