import { Payment } from "../repositories/paymentRepository.js";
import { Recharge } from "../repositories/rechargeRepository.js";

function calculateBalance(recharges: Recharge[], payment: Payment[]) {
  const totalRecharges = recharges.reduce((prev, curr) => prev + curr.amount, 0);
  const totalPayments = payment.reduce((prev, curr) => prev + curr.amount, 0);
  return totalRecharges - totalPayments;
}

export default calculateBalance;