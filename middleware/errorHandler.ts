import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    if (err.code === "EBADCSRFTOKEN") {
        // log error
        console.warn("CSRF token mismatch");
        
        res.status(403);
        res.send("Form tampered with");
    } else {
        console.log(err);
        res.status(500).send('Something broke. What did you do?');
    }
};