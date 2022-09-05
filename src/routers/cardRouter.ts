import {Router} from 'express';
import {activateCard, blockCard, createCard, unblockCard} from '../controllers/cardController.js';
import joiValidator from '../middlewares/joiValidator.js';
import verifyApiKey from '../middlewares/verifyApiKey.js';
import {cardActivationSchema, cardPassword, cardCreationSchema} from '../schemas/cardSchemas.js';


const cardRouter = Router();

cardRouter.post("/create", joiValidator(cardCreationSchema), verifyApiKey, createCard);
cardRouter.patch("/activate", joiValidator(cardActivationSchema), activateCard);
cardRouter.patch("/block/:cardId", joiValidator(cardPassword), blockCard);
cardRouter.patch("/unblock/:cardId", joiValidator(cardPassword), unblockCard);
cardRouter.patch("/recharge/:")

export default cardRouter;