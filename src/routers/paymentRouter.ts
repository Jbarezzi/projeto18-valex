import { Router } from "express";
import pay from "../controllers/paymentController.js";
import joiValidator from "../middlewares/joiValidator.js";
import { paymentSchema } from "../schemas/paymentSchemas.js";

const paymentRouter = Router();

paymentRouter.post("/payment/business/:businessId", joiValidator(paymentSchema), pay);

export default paymentRouter;