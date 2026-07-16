import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { getCharacterData, getCharacterNames } from "../utils/helper.js";

const postController = async (req: Request, res: Response) => {
  const { clientX, clientY } = req.body;

  const gameSession = await prisma.gameSession.create({});

  const coordinates = await Promise.all(
    getCharacterNames().map((characterName) =>
      prisma.coordinate.create({
        data: {
          x: clientX / 2,
          y: clientY / 2,
          character_name: characterName,
          gameSessionId: gameSession.id
        }
      })
    )
  );

  res.json({
    gameSessionId: gameSession.id,
    characterData: getCharacterData(coordinates)
  });
};

export { postController };
