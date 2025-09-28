import { Request, Response, NextFunction } from 'express';

export function loggerHandler(req: Request, res: Response, next: NextFunction): void {
  console.log(req.method, ":", req.url);
  next();
}