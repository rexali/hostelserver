"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPay = void 0;
const Flutterwave = require('flutterwave-node-v3');
const booking_model_1 = __importDefault(require("../../bookings/models/booking.model"));
const verifyPay = async (req, res) => {
    // const Flutterwave = await import("flutterwave-node-v3");
    if (req.query.status === 'successful') {
        const transactionDetails = await booking_model_1.default.findOne({ where: { status: req.query.tx_ref } });
        const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
        const response = await flw.Transaction.verify({ id: req.query.transaction_id });
        if (response.data.status === "successful" &&
            response.data.amount === transactionDetails.amount && // expected amount from db
            response.data.currency === "NGN" // expected currency
        ) {
            // Success! Confirm the customer's payment
        }
        else {
            // Inform the customer their payment was unsuccessful
        }
    }
};
exports.verifyPay = verifyPay;
