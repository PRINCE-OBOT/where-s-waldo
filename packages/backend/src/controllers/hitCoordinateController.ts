import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

const hitCoordinateController = async (req: Request, res: Response) => {
  const { gameSessionId, clientX, clientY } = req.body;

  const TOLERANCE = 10;

  const hitCharacters = await prisma.$transaction(async (tx) => {
    const where = {
      gameSessionId,
      found: false,
      x: {
        gte: clientX - TOLERANCE,
        lte: clientX + TOLERANCE
      },
      y: {
        gte: clientY - TOLERANCE,
        lte: clientY + TOLERANCE
      }
    };

    const updated = await tx.coordinate.updateMany({
      where,
      data: {
        found: true
      }
    });

    if (updated.count) where.found = true;

    return await tx.coordinate.findMany({ where });
  });

  const charactersToFind = await prisma.coordinate.count({
    where: {
      gameSessionId,
      found: false
    }
  });

  const allCharacterFound = charactersToFind === 0;

  res.json({
    hitCharacters,
    allCharacterFound
  });
};

export { hitCoordinateController };
