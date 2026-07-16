import request from "supertest";
import express from "express";

import { router } from "../routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);

describe("POST /hit-coordinate", () => {
  test("Should find character exactly on hidden spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const hitCoordinateReq = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 50, clientY: 100 });

    const hitCoordinateRes = hitCoordinateReq.body;

    expect(hitCoordinateRes.CharacterData).toHaveLength(3);
  });

  test("Should find character around hidden spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const hitCoordinateReq = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 55, clientY: 110 });

    const hitCoordinateRes = hitCoordinateReq.body;

    expect(hitCoordinateRes.CharacterData).toHaveLength(3);
  });

  test("Should not find any character", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const hitCoordinateReq = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 65, clientY: 110 });

    const hitCoordinateRes = hitCoordinateReq.body;

    expect(hitCoordinateRes.CharacterData).toHaveLength(0);
  });
});
