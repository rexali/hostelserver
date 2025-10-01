import { Request, Response } from "express"
import { AuthService } from "../controllers/auth.controller"

export const removeUserHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        let result = await AuthService.removeUser(id);
        if (result) {
            res.json({ status: "success", data: { result: true }, message: "Account removed" });
        } else {
            res.json({ status: "fail", data: { result: false }, message: "Failed to remove account" });
        }

    } catch (error: any) {
        console.warn(error);
        res.json({ status: "fail", data: null, message: "Error: " + error.message });
    }

}