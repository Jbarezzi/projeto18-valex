import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "middlewares/errorHandler";
import router from "routers";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT);