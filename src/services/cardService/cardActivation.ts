import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { Card, findById, update } from "../../repositories/cardRepository.js";
import bcrypt from "bcrypt";
import cryptr from "../../utils/cryptr.js";
import { conflictError, notFoundError } from "../../utils/errorFactory.js";
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
  if(!!password) throw conflictError("O cartão já está ativado.");
}

function verifySecurityCode(securityCode: string, dbSecurityCode: string) {
  const decryptedSecurityCode = cryptr.decrypt(dbSecurityCode);
  if(securityCode !== decryptedSecurityCode) throw conflictError("O código CVC está incorreto.");
}

async function activateCardService(cardId: number, securityCode: string, password: string) {
  const card = await verifyIfCardExists(cardId);
  verifyIfCardIsExpired(card.expirationDate);
  verifyIfCardIsActivated(card.password);
  verifySecurityCode(securityCode, card.securityCode);
  const saltRounds = 10;
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  const cardData = {
    password: encryptedPassword,
    isBlocked: false,
  };
  await update(cardId, cardData);
}

export default activateCardService;