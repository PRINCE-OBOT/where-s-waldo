import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { generateRoster, getCharacterOtherData } from "../utils/helper.js";

const postController = async (req: Request, res: Response) => {
  const { clientWidth, clientHeight, imageId } = req.body;

  const gameSession = await prisma.gameSession.create({});

  const coordinates = await Promise.all(
    getCharacterOtherData(imageId).map((obj) =>
      prisma.coordinate.create({
        data: {
          x: clientWidth * obj.x,
          y: clientHeight * obj.y,
          character_name: obj.character_name,
          gameSessionId: gameSession.id
        }
      })
    )
  );

  res.json({
    gameSessionId: gameSession.id,
    roster: generateRoster(coordinates)
  });
};

export { postController };
