import dayjs from "dayjs";
import { Payment } from "../../repositories/paymentRepository.js";
import { Recharge } from "../../repositories/rechargeRepository.js";
import { getCardBalance, verifyIfCardExists } from "./cardValidations.js";

function formatDates(entitys: Payment[] | Recharge[]) {
  const formatedDates = entitys.map(entity => {
    return {...entity, timestamp: dayjs(entity.timestamp).format("DD/MM/YYYY")}
  });
  return formatedDates;
}

async function getBalanceService(cardId: number) {
  await verifyIfCardExists(cardId);
  const {balance, payments, recharges} = await getCardBalance(cardId);
  const balanceObject = {
    balance,
    transaction: formatDates(payments),
    recharges: formatDates(recharges),
  };
  return balanceObject;
}

export default getBalanceService;