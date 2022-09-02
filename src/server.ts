import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors(), json());

const PORT = process.env.PORT || 5000;
app.listen(PORT);