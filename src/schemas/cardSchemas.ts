import Joi from "joi";

const cardCreationSchema = Joi.object({
   employeeId: Joi.number().required(),
   cardType: Joi.string().trim().valid("groceries", "restaurant", "transport", "education", "health").required()
});

export { cardCreationSchema };