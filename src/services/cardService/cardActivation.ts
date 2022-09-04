import { Card, findById } from "../../repositories/cardRepository";
import { notFoundError } from "../../utils/errorFabric";

async function verifyIfCardExists(cardId: number) {
  const isCardValid: Card = await findById(cardId);
  if(!isCardValid) throw notFoundError('o cartão');
}

async function activateCardService(cardId: number, securityCode: string, password: string) {
  await verifyIfCardExists(cardId);
  
}

export default activateCardService;