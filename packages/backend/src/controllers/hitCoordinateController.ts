import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { getCharacterData } from "../utils/helper.js";

const hitCoordinateController = async (req: Request, res: Response) => {
  const { gameSessionId, clientX, clientY } = req.body;

  const TOLERANCE = 10;

  const coordinates = await prisma.$transaction(async (tx) => {
    const where = {
      gameSessionId,
      x: {
        gte: clientX - TOLERANCE,
        lte: clientX + TOLERANCE
      },
      y: {
        gte: clientY - TOLERANCE,
        lte: clientY + TOLERANCE
      }
    };

    await tx.coordinate.updateMany({
      where,
      data: {
        found: true
      }
    });

    return await tx.coordinate.findMany({ where });
  });

  res.json({ CharacterData: getCharacterData(coordinates) });
};

export { hitCoordinateController };
