"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getTransactionUrl = async (req, res) => {
    try {
        const { amount, email } = req.body;
        let { data } = await axios_1.default.post(`https://api.paystack.co/transaction/initialize`, {
            amount,
            email,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.PAYSTACK_SECRET_KEY,
            }
        });
        console.log(data);
        res.status(200).json({ status: "success", data: data.data, message: "Transaction url created" });
    }
    catch (error) {
        console.warn(error);
        res.status(200).json({ status: "success", data: null, message: "Error! " + error.message });
    }
};
exports.getTransactionUrl = getTransactionUrl;
