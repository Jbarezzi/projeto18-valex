import { update } from "../../repositories/cardRepository.js";
import bcrypt from "bcrypt";
import cryptr from "../../utils/cryptr.js";
import { conflictError, unauthorizedError } from "../../utils/errorFactory.js";
import { verifyIfCardExists } from "./cardValidations.js";

function verifyIfCardIsActivated(password: string | undefined) {
  if(!!password) throw conflictError("O cartão já está ativado.");
}

function verifySecurityCode(securityCode: string, dbSecurityCode: string) {
  const decryptedSecurityCode = cryptr.decrypt(dbSecurityCode);
  if(securityCode !== decryptedSecurityCode) throw unauthorizedError("O código CVC");
}

async function hashPassword(password: string) {
  const saltRounds = 10;
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  const cardData = {
    password: encryptedPassword,
    isBlocked: false,
  };
  return cardData;
}

async function activateCardService(cardId: number, securityCode: string, password: string) {
  const card = await verifyIfCardExists(cardId);
  verifyIfCardIsActivated(card.expirationDate);
  verifyIfCardIsActivated(card.password);
  verifySecurityCode(securityCode, card.securityCode);
  const cardData = await hashPassword(password);
  await update(cardId, cardData);
}

export default activateCardService;