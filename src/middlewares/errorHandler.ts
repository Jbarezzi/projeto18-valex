import { Request, Response, NextFunction } from "express";

async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if(error.type === "error_data") return res.status(422).send({ message: error.message });
    

    res.sendStatus(500);
}

export default errorHandler;