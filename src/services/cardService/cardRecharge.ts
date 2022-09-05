import { insert, RechargeInsertData } from "../../repositories/rechargeRepository.js";
import { verifyIfCardExists, verifyIfCardIsActivated, verifyIfCardIsExpired } from "./cardValidations.js";

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