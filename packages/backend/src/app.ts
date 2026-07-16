import "dotenv/config";

import cors from "cors";
import express from "express";
import type { Request, Response, NextFunction } from "express";

import { router } from "./routes/index.js";
import { prisma } from "./lib/prisma.js";

const app = express();

const INVALID_LOGIN_MSG = "Invalid username or password";

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
