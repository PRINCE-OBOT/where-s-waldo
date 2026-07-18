import request from "supertest";
import express from "express";

import { router } from "../routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);

describe("POST /game-start", () => {
  test("Should respond with game session and character data ", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const { body, status } = gameStartReq;

    expect(body).toEqual({
      gameSessionId: expect.any(String),
      coordinates: expect.any(Array)
    });
    expect(status).toBe(200);
  });
});


