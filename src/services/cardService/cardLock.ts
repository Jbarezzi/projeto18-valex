import { update } from "../../repositories/cardRepository.js";
import { verifyIfCardExists, verifyIfCardIsBlocked, verifyIfCardIsExpired, verifyPassword } from "./cardValidations.js";

async function blockUnblockCardService(cardId: number, password: string, type: string) {
  const card = await verifyIfCardExists(cardId);
  verifyIfCardIsExpired(card.expirationDate);
  verifyIfCardIsBlocked(card.isBlocked, type);
  verifyPassword(password, card.password!);
  const cardUpdate = type === "block" ? {isBlocked: true} : {isBlocked: false};
  await update(cardId, cardUpdate);
}

export default blockUnblockCardService;