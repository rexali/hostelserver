"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyTransaction = async (req, res) => {
    // call paystack verify transaction api
    try {
        const { reference } = req.body;
        const { data } = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.PAYSTACK_SECRET
            }
        });
        res.status(200).json({ status: "success", data: data.data.success, message: "Verified" });
    }
    catch (error) {
        console.warn(error);
        res.status(500).json({ status: "fail", data: null, message: "Error! " + error.message });
    }
};
exports.verifyTransaction = verifyTransaction;
