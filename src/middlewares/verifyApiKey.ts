import { NextFunction, Request, Response } from 'express';

function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const key: string | string[] | undefined = req.headers['x-api-key'];

  if(key === '') throw { type: 'error_unauthorized', message: 'Nao foi encontrada a chave de acesso da empresa.' };
  res.locals.key = key;
  next();
}

export default verifyApiKey;