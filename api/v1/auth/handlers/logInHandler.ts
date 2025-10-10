import { NextFunction, Response, Request } from "express";
import passport from "../passport.config";

export default function logInHandler(req: Request, res: Response, next: NextFunction) {

    passport.authenticate(
        'local',
        {
            failureRedirect: '/login',
            failureMessage: true,
            session: true,
        },

        function (err: any, user: any, info: any, status: any) {
            if (err) {
                return next(err)
            }
            if (!user) {

                res.status(400).json({ status: "fail", data: { result: false, user: null }, message: "Login failed" });
                // return res.redirect('/signin') 
            } else {
                // set token cookie if you want e.g.,
                res.cookie("token", user?.token);
                req.session.isAuthenticated = true;
                req.user = { ...user };
                
                res.status(200).json({ status: "success", data: { token: user?.token }, message: "Login successful" });
                // res.redirect('/dashboard');
            }
        }

    )(req, res, next);
}
