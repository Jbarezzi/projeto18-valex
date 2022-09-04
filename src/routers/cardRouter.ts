import {Router} from 'express';
import {createCard} from '../controllers/cardController.js';
import joiValidator from '../middlewares/joiValidator.js';
import verifyApiKey from '../middlewares/verifyApiKey.js';
import {cardCreationSchema} from '../schemas/cardSchemas.js';


const cardRouter = Router();

cardRouter.post("/create-card", joiValidator(cardCreationSchema), verifyApiKey, createCard);

export default cardRouter;