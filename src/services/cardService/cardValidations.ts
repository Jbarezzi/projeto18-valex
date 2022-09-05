import bcrypt from "bcrypt";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { Card, findById } from "../../repositories/cardRepository.js";
import { notFoundError, conflictError, unauthorizedError } from "../../utils/errorFactory.js";
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

function verifyPassword(password: string, dbPassword: string) {
  const isPasswordValid = bcrypt.compare(password, dbPassword);
  if(!isPasswordValid) throw unauthorizedError("A senha");
}

export {verifyIfCardExists, verifyIfCardIsExpired, verifyPassword};