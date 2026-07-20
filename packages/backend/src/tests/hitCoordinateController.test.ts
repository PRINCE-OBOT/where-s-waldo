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
      .send({ clientWidth: 100, clientHeight: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 50,
      offsetY: 100,
      character_name: "Waldo"
    });

    expect(firstHit.body.hitCharacter).not.toBeNull();
    expect(firstHit.body.allCharacterFound).toBeFalsy();
  });

  test("Should find two characters by hitting exactly at it spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientWidth: 100, clientHeight: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 50,
      offsetY: 100,
      character_name: "Waldo"
    });

    const secondHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 25,
      offsetY: 50,
      character_name: "Wodlaw"
    });

    expect(firstHit.body.hitCharacter).not.toBeNull();
    expect(firstHit.body.allCharacterFound).toBeFalsy();

    expect(secondHit.body.hitCharacter).not.toBeNull();
    expect(secondHit.body.allCharacterFound).toBeFalsy();
  });

  test("Should find two characters by hitting around it spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientWidth: 100, clientHeight: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 40,
      offsetY: 110,
      character_name: "Waldo"
    });

    const secondHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 15,
      offsetY: 60,
      character_name: "Wodlaw"
    });

    expect(firstHit.body.hitCharacter).not.toBeNull();
    expect(firstHit.body.allCharacterFound).toBeFalsy();

    expect(secondHit.body.hitCharacter).not.toBeNull();
    expect(secondHit.body.allCharacterFound).toBeFalsy();
  });

  test("Should find all characters by hitting exactly at it spot", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientWidth: 100, clientHeight: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 40,
      offsetY: 110,
      character_name: "Waldo"
    });

    const secondHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 15,
      offsetY: 60,
      character_name: "Wodlaw"
    });

    const thirdHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 100,
      offsetY: 200,
      character_name: "Wenda"
    });

    expect(firstHit.body.hitCharacter).not.toBeNull();
    expect(firstHit.body.allCharacterFound).toBeFalsy();

    expect(secondHit.body.hitCharacter).not.toBeNull();
    expect(secondHit.body.allCharacterFound).toBeFalsy();

    expect(thirdHit.body.hitCharacter).not.toBeNull();
    expect(thirdHit.body.allCharacterFound).toBeTruthy();
  });

  test("Should not find any character", async () => {
    const gameStartReq = await request(app)
      .post("/game-start")
      .send({ clientWidth: 100, clientHeight: 200 });

    const gameSessionId = gameStartReq.body.gameSessionId;

    const firstHit = await request(app).post("/hit-coordinate").send({
      gameSessionId,
      offsetX: 30,
      offsetY: 100,
      character_name: "Waldo"
    });

    expect(firstHit.body.hitCharacter).toBeNull();
    expect(firstHit.body.allCharacterFound).toBeFalsy();
  });
});
