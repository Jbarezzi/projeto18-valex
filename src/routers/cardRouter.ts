import {Router} from 'express';
import {activateCard, createCard} from '../controllers/cardController.js';
import joiValidator from '../middlewares/joiValidator.js';
import verifyApiKey from '../middlewares/verifyApiKey.js';
import {cardActivationSchema, cardCreationSchema} from '../schemas/cardSchemas.js';


const cardRouter = Router();

cardRouter.post("/create", joiValidator(cardCreationSchema), verifyApiKey, createCard);
cardRouter.post("/activate", joiValidator(cardActivationSchema), activateCard);

export default cardRouter;