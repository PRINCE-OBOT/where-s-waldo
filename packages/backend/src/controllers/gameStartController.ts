import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { generateRoster, getCharacterOtherData } from "../utils/helper.js";

const postController = async (req: Request, res: Response) => {
  console.log('caseId')
  const { clientWidth, clientHeight, caseId } = req.body;

  const gameSession = await prisma.gameSession.create({});
  const coordinates = await Promise.all(
    getCharacterOtherData(caseId).map((obj) =>
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

  console.log(gameSession.id, coordinates);
  res.json({
    gameSessionId: gameSession.id,
    roster: generateRoster(coordinates)
  });
};

export { postController };
