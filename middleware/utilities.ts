import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

declare module 'express-session' {
    interface SessionData {
        isAuthenticated?: boolean;
        user?: { username: string; email: string };
    }
}

export function getCsrfToken(req: Request, res: Response, next: NextFunction) {
    let token = req.csrfToken();
    console.log(token,2);
    res.locals.token = token;
    res.clearCookie("_csrf");
    res.cookie("_csrf", token);
    next();
};

export function authenticated(req: Request, res: Response, next: NextFunction) {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated) {
        res.locals.user = req.session.user;
    }
    next();
};

export function requireAuthentication(req: Request, res: Response, next: NextFunction) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect(config.routes.login);
    }
};


export function auth(username: string, password: any, session: { isAuthenticated: boolean; user: { username: any; }; }) {
    // hit database and check password with compare
    var isAuth = username === 'joshua' || username === 'brian';

    if (isAuth) {
        session.isAuthenticated = isAuth;
        session.user = { username: username };
    }
    return isAuth;
};

export function logOut(session: any) {
    session.isAuthenticated = false;
    delete session.user;
};