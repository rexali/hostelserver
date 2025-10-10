import { NextFunction, Response, Request } from "express";

declare module 'express-session' {
    interface SessionData {
        isAuthenticated?: boolean;
        user?: { username: string; email: string };
        messages: any
    }
}
export default function loggedinHandler(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            res.status(400).json({ status: "fail", data: { user: null }, message: "Error: Login failed-" + req.session.messages });
            // return res.redirect('/login') 
        } else {
            // set token cookie if you want e.g.,
            const userToken = req.user as { token: string }            
            res.cookie("token", userToken.token);
            req.session.isAuthenticated = true;
            res.status(200).json({ status: "success", data: { user: req.user }, message: "Login successful" });
            // res.redirect('/dashboard');
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ status: "fail", data: { user: null }, message: "Login failed" });
        // res.redirect('/login');
    }


}
