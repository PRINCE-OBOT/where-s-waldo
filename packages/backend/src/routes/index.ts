import { Router } from "express";
import { hitCoordinateController } from "../controllers/hitCoordinateController.js";
import * as gameStart from "../controllers/gameStartController.js";

const router = Router();

router.post("/hit-coordinate", hitCoordinateController);

router.post("/game-start", gameStart.postController);

export { router };
