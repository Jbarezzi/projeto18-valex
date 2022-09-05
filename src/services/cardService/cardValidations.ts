import bcrypt from "bcrypt";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { Card, findById } from "../../repositories/cardRepository.js";
import { notFoundError, conflictError, unauthorizedError } from "../../utils/errorFactory.js";
import * as rechargeRepository from "../../repositories/rechargeRepository.js";
import * as payementRepository from "../../repositories/paymentRepository.js";
import calculateBalance from "../../utils/calculateBalance.js";
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

async function verifyIfCardExists(cardId: number) {
  const isCardValid: Card = await findById(cardId);
  if(!isCardValid) throw notFoundError('o cartão');
  return isCardValid;
}

function verifyIfCardIsExpired(expiration: string) {
  const today = dayjs(dayjs(), "MM/YY");
  const expirationDate = dayjs(expiration, "MM/YY");
  const hasExpired: boolean = today.isSameOrAfter(expirationDate, 'month');
  if(hasExpired) throw conflictError("O cartão já está expirado.");
}

function verifyIfCardIsActivated(password: string | undefined) {
  if(!password) throw conflictError("O cartão não está ativado.");
}

function verifyIfCardIsBlocked(isBlocked: boolean, type: string) {
  switch(type) {
    case "block":
      if(isBlocked) throw conflictError("O cartão está bloqueado.");
      break;
    case "unblock":
      if(!isBlocked) throw conflictError("O cartão está desbloqueado.");
      break;
  };
}

function verifyPassword(password: string, dbPassword: string) {
  const isPasswordValid = bcrypt.compare(password, dbPassword);
  if(!isPasswordValid) throw unauthorizedError("A senha");
}

async function getCardBalance(cardId: number) {
  const recharges: rechargeRepository.Recharge[] = await rechargeRepository.findByCardId(cardId);
  const payments: payementRepository.Payment[] = await payementRepository.findByCardId(cardId);
  const balance = calculateBalance(recharges, payments);
  return {recharges, payments, balance};
}

export {verifyIfCardExists, verifyIfCardIsExpired, verifyPassword, verifyIfCardIsActivated, verifyIfCardIsBlocked, getCardBalance};