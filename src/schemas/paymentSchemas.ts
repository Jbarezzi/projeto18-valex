import Joi from "joi";

const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  password: Joi.string().trim().pattern(/^[0-9]+$/).length(4).required(),
  cardId: Joi.number().required(),
});

export {paymentSchema};