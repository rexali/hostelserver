import axios from "axios";
import dotenv from 'dotenv';
import { Request, response, Response } from "express";
dotenv.config();

export const verifyTransaction = async (req: Request, res: Response) => {
    // call paystack verify transaction api
    try {
        const { reference } = req.body;
        const {data} = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.PAYSTACK_SECRET
            }
        });
        res.status(200).json({status:"success", data: data.data.success, message:"Verified"})
    } catch (error:any) {
        console.warn(error);
        res.status(500).json({ status:"fail", data: null, message:"Error! "+error.message})
    }
}