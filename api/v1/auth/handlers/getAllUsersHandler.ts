import { Request, Response } from "express"
import { AuthService } from "../controllers/auth.controller"

export const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        let users = await AuthService.getAllUsers();
        if (users !== null) {
            res.json({ status: "success", data: { users }, message: "Users fetched" });
        } else {
            res.json({ status: "fail", data: null, message: "Users fetched failed"})
        }

    } catch (error: any) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + error.message });
    }

}