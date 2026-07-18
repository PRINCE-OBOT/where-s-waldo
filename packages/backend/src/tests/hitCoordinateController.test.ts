import request from "supertest";
import express from "express";

import { router } from "../routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);

describe("POST /hit-coordinate", () => {
  test("Should find one character", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 50, clientY: 100 });

    expect(firstHit.body.hitCharacters).toHaveLength(1);
    expect(firstHit.body.allCharacterFound).toBeFalsy();
  });

  test("Should find two characters by hitting exactly at it spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 50, clientY: 100 });

    const secondHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 25, clientY: 50 });

    expect(firstHit.body.hitCharacters).toHaveLength(1);
    expect(firstHit.body.allCharacterFound).toBeFalsy();

    expect(secondHit.body.hitCharacters).toHaveLength(1);
    expect(secondHit.body.allCharacterFound).toBeFalsy();
  });

  test("Should find two characters by hitting around it spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 40, clientY: 110 });

    const secondHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 15, clientY: 60 });

    expect(firstHit.body.hitCharacters).toHaveLength(1);
    expect(firstHit.body.allCharacterFound).toBeFalsy();

    expect(secondHit.body.hitCharacters).toHaveLength(1);
    expect(secondHit.body.allCharacterFound).toBeFalsy();
  });

  test("Should find all characters by hitting exactly at it spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 40, clientY: 110 });

    const secondHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 15, clientY: 60 });

    const thirdHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 100, clientY: 200 });

    expect(firstHit.body.hitCharacters).toHaveLength(1);
    expect(firstHit.body.allCharacterFound).toBeFalsy();

    expect(secondHit.body.hitCharacters).toHaveLength(1);
    expect(secondHit.body.allCharacterFound).toBeFalsy();

    expect(thirdHit.body.hitCharacters).toHaveLength(1);
    expect(thirdHit.body.allCharacterFound).toBeTruthy();
  });

  test("Should not find any character", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientX: 100, clientY: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app)
      .post("/hit-coordinate")
      .send({ gameSessionId, clientX: 30, clientY: 100 });

    expect(firstHit.body.hitCharacters).toHaveLength(0);
    expect(firstHit.body.allCharacterFound).toBeFalsy();
  });
});
