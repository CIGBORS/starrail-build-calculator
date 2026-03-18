import { Router } from "express";
import { getCharacter } from "../../controllers/starRail.controller.js";

const router = Router();

router.get("/:id", getCharacter);

export default router;