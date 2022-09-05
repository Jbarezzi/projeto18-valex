import { insert, RechargeInsertData } from "../../repositories/rechargeRepository.js";
import { conflictError } from "../../utils/errorFactory.js";
import { verifyIfCardExists, verifyIfCardIsExpired } from "./cardValidations.js";

function verifyIfCardIsActivated(password: string | undefined) {
  if(!password) throw conflictError("O cartão não está ativado.");
}

async function rechargeCardService(cardId: number, amount: number) {
  const card = await verifyIfCardExists(cardId);
  verifyIfCardIsActivated(card.password);
  verifyIfCardIsExpired(card.expirationDate);
  const rechargeData: RechargeInsertData = {
    cardId,
    amount,
  } 
  await insert(rechargeData);
}

export default rechargeCardService;