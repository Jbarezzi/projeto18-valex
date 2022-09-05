import { update } from "../../repositories/cardRepository.js";
import { conflictError } from "../../utils/errorFactory.js";
import { verifyIfCardExists, verifyIfCardIsExpired, verifyPassword } from "./cardValidations.js";

function verifyIfCardIsBlocked(isBlocked: boolean, type: string) {
  switch(type) {
    case "block":
      if(isBlocked) throw conflictError("O cartão já está bloqueado.");
    case "unblock":
      if(!isBlocked) throw conflictError("O cartão já está desbloqueado.");
  };
}

async function blockUnblockCardService(cardId: number, password: string, type: string) {
  const card = await verifyIfCardExists(cardId);
  verifyIfCardIsExpired(card.expirationDate);
  verifyIfCardIsBlocked(card.isBlocked, type);
  verifyPassword(password, card.password!);
  const cardUpdate = type === "block" ? {isBlocked: true} : {isBlocked: false};
  await update(cardId, cardUpdate);
}

export default blockUnblockCardService;