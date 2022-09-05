import {Router} from 'express';
import {activateCard, blockCard, createCard, getBalance, rechargeCard, unblockCard} from '../controllers/cardController.js';
import joiValidator from '../middlewares/joiValidator.js';
import verifyApiKey from '../middlewares/verifyApiKey.js';
import {cardActivationSchema, cardPasswordSchema, cardCreationSchema, rechargeSchema} from '../schemas/cardSchemas.js';


const cardRouter = Router();

cardRouter.post("/card/create", joiValidator(cardCreationSchema), verifyApiKey, createCard);
cardRouter.patch("/card/activate", joiValidator(cardActivationSchema), activateCard);
cardRouter.patch("/card/block/:cardId", joiValidator(cardPasswordSchema), blockCard);
cardRouter.patch("/card/unblock/:cardId", joiValidator(cardPasswordSchema), unblockCard);
cardRouter.post("/card/recharge/:cardId", joiValidator(rechargeSchema), rechargeCard);
cardRouter.get("/card/balance/:cardId", getBalance);

export default cardRouter;