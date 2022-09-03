import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "middlewares/errorHandler";
import router from "routers";

const app = express();

app.use(cors(), json(), router, errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT);