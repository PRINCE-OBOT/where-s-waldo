import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import {
  getCharacterOtherData
} from "../utils/helper.js";

const postController = async (req: Request, res: Response) => {
  const { clientX, clientY } = req.body;

  const gameSession = await prisma.gameSession.create({});

  const coordinates = await Promise.all(
    getCharacterOtherData().map((obj) =>
      prisma.coordinate.create({
        data: {
          x: clientX * obj.x,
          y: clientY * obj.y,
          character_name: obj.character_name,
          gameSessionId: gameSession.id
        }
      })
    )
  );

  res.json({
    gameSessionId: gameSession.id,
    coordinates
  });
};

export { postController };
