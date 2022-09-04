import { NextFunction, Request, Response } from 'express';
import { Schema } from "joi";

const joiValidator = (schema: Schema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const body: {} = req.body;

        const { error } = schema.validate(body, { abortEarly: false });
        if(error) throw { type: 'error_unprocessable_entity', message: 'Dados inválidos.' };

        next();
    }
}

export default joiValidator;