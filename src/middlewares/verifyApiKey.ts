import { NextFunction, Request, Response } from 'express';
import { notFoundError } from '../utils/errorFactory.js';

function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const key: string | string[] | undefined = req.headers['x-api-key'];

  if(key === '' || key === undefined) throw notFoundError("a chave de acesso.");
  res.locals.key = key;
  next();
}

export default verifyApiKey;