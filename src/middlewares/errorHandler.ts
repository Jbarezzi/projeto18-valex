import { Request, Response, NextFunction } from "express";

async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    res.sendStatus(500);
}

export default errorHandler;