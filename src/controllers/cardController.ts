import type {Request, Response} from 'express';
import type {TransactionTypes} from '../repositories/cardRepository.js';
import getBalanceService from '../services/cardService/cardBalance.js';
import createCardService from '../services/cardService/cardCreation.js';
import blockUnblockCardService from '../services/cardService/cardLock.js';
import rechargeCardService from '../services/cardService/cardRecharge.js';
import activateCardService from './../services/cardService/cardActivation.js';

async function createCard(req: Request, res: Response) {
  const { employeeId, cardType }: { employeeId: number, cardType: TransactionTypes } = req.body;
  const apiKey: string = res.locals.key;

  await createCardService(employeeId, cardType, apiKey);

  res.sendStatus(201);
}

async function activateCard(req: Request, res: Response) {
  const {cardId, securityCode, password}: {cardId: number, securityCode: string, password: string} = req.body;

  await activateCardService(cardId, securityCode, password);

  res.sendStatus(204);
}

async function blockCard(req: Request, res: Response) {
  const cardId: number = Number(req.params.cardId);
  const password: string = req.body.password;
  const type: string = "block";

  await blockUnblockCardService(cardId, password, type);

  res.sendStatus(204);
}

async function unblockCard(req: Request, res: Response) {
  const cardId: number = Number(req.params.cardId);
  const password: string = req.body.password;
  const type: string = "unblock";

  await blockUnblockCardService(cardId, password, type);

  res.sendStatus(204);
}

async function rechargeCard(req: Request, res: Response) {
  const cardId: number = Number(req.params.cardId);
  const amount: number = req.body.amount;

  await rechargeCardService(cardId, amount);

  res.sendStatus(204);
}

async function getBalance(req: Request, res: Response) {
  const cardId: number = Number(req.params.cardId);

  const balance = await getBalanceService(cardId);

  res.status(200).send(balance);
}

export { createCard, activateCard, blockCard, unblockCard, rechargeCard, getBalance };