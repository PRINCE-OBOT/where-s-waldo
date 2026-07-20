import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const hitCoordinateController = async (req: Request, res: Response) => {
  const { gameSessionId, offsetX, offsetY, character_name } = req.body;

  const TOLERANCE = 10;

  const hitCharacter = await prisma.$transaction(async (tx) => {
    const where = {
      gameSessionId,
      found: false,
      character_name,
      x: {
        gte: offsetX - TOLERANCE,
        lte: offsetX + TOLERANCE
      },
      y: {
        gte: offsetY - TOLERANCE,
        lte: offsetY + TOLERANCE
      }
    };

    const updated = await tx.coordinate.updateMany({
      where,
      data: {
        found: true
      }
    });

    if (updated.count) where.found = true;

    return await tx.coordinate.findFirst({ where });
  });

  const charactersToFind = await prisma.coordinate.count({
    where: {
      gameSessionId,
      found: false
    }
  });

  const allCharacterFound = charactersToFind === 0;

  let timeStamp = 0
  if (allCharacterFound) {
    const gameSession = await prisma.gameSession.findUnique({
      where: {
        id: gameSessionId
      }
    });

    if (gameSession) {
      timeStamp = new Date().getTime() - gameSession.createdAt.getTime();
    }
  }
  res.json({
    hitCharacter,
    allCharacterFound,
    timeStamp
  });
};

export { hitCoordinateController };
