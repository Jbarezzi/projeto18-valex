import Joi from "joi";

const cardCreationSchema = Joi.object({
   employeeId: Joi.number().required(),
   cardType: Joi.string().trim().valid("groceries", "restaurant", "transport", "education", "health").required(),
});

const cardActivationSchema = Joi.object({
  cardId: Joi.number().required(),
  securityCode: Joi.string().trim().pattern(/^[0-9]+$/).required(),
  password: Joi.string().trim().pattern(/^[0-9]+$/).length(4).required(),
});

export { cardCreationSchema, cardActivationSchema };