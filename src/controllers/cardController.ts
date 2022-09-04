import type {Request, Response} from 'express';
import type {TransactionTypes} from '../repositories/cardRepository.js';
import {createNewCard} from '../services/cardService.js';

async function createCard(req: Request, res: Response) {
  const { employeeId, cardType }: { employeeId: number, cardType: TransactionTypes } = req.body;
  const apiKey: string = res.locals.key;

  const card = await createNewCard(employeeId, cardType, apiKey);

  res.sendStatus(201);
}

export {createCard};