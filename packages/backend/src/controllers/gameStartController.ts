import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { getCharacterData, getCharacterNames } from "../utils/helper.js";

const postController = async (req: Request, res: Response) => {
  const { clientX, clientY } = req.body;

  const gameSession = await prisma.gameSession.create({});

  const xs = [0.5, 0.25, 1];
  const ys = [0.5, 0.25, 1];

  const coordinates = await Promise.all(
    getCharacterNames().map((characterName, i) =>
      prisma.coordinate.create({
        data: {
          x: clientX * xs[i]!,
          y: clientY * ys[i]!,
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
