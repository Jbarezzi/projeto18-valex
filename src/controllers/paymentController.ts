import { Request, Response } from "express";
import payService from "../services/paymentService/payment.js";

async function pay(req: Request, res: Response) {
  const {amount, cardId, password}: {amount: number, cardId: number, password: string} = req.body;
  const businessId: number = Number(req.params.businessId);

  await payService(cardId, amount, businessId, password);

  res.sendStatus(204);
}

export default pay;