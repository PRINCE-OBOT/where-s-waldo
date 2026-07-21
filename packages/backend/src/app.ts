import "dotenv/config";

import cors from "cors";
import express from "express";

import { router } from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173" // frontend local dev
      // env.FRONTEND_URL!, // frontend production
    ],
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); 

app.use("/", router);



export default app;
