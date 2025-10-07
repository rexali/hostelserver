import axios from "axios";
import dotenv  from 'dotenv';
import { Request, Response } from "express";
dotenv.config();

export const getTransactionUrl = async (req:Request, res:Response) => {
    try {
        const { amount, email } = req.body;
        let { data } = await axios.post(`https://api.paystack.co/transaction/initialize`, {
             amount,
             email,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.PAYSTACK_SECRET_KEY,
            }
        });
        console.log(data);
        
        res.status(200).json({status:"success", data: data.data, message:"Transaction url created"})
    } catch (error:any) {
        console.warn(error);
        res.status(200).json({status:"success", data:null, message:"Error! "+error.message})
    }
}
