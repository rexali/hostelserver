import { Response, Request,NextFunction } from "express";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(404).send('You seem lost. Page not found.');
}