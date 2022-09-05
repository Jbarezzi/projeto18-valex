import { findById } from "../../repositories/businessRepository.js";
import { insert } from "../../repositories/paymentRepository.js";
import { conflictError, notFoundError } from "../../utils/errorFactory.js";
import { getCardBalance, verifyIfCardExists, verifyIfCardIsActivated, verifyIfCardIsBlocked, verifyIfCardIsExpired, verifyPassword } from "../cardService/cardValidations.js";

async function verifyIfBusinessExists(businessId: number) {
  const isBusinessValid = await findById(businessId);
  if(!isBusinessValid) throw notFoundError("a empresa");
  return isBusinessValid;
}

function verifyIfBusinessAndCardHaveSameType(businesType: string, cardType: string) {
  if(businesType !== cardType) throw conflictError("O tipo do cartão é diferente do tipo da loja.");
}

async function payService(cardId: number, amount: number, businessId: number, password: string) {
  const card = await verifyIfCardExists(cardId);
  verifyIfCardIsActivated(card.password);
  verifyIfCardIsExpired(card.expirationDate);
  verifyIfCardIsBlocked(card.isBlocked, "block");
  const {type}: {type: string} = await verifyIfBusinessExists(businessId);
  verifyIfBusinessAndCardHaveSameType(type ,card.type);
  verifyPassword(password, card.password!);
  const {balance} = await getCardBalance(cardId);
  if(balance < amount) {
    throw conflictError("O cartão não possui saldo suficiente.");
  }
  const paymentData = {
    cardId,
    businessId,
    amount,
  }
  await insert(paymentData);
}

export default payService;