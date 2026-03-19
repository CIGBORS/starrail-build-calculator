import { Router } from "express";
import { getCharacter, getCharacterAllInformations } from "../../controllers/starRail.controller.js";

const router = Router();

router.get("/all/:id", getCharacterAllInformations);
router.get("/:id", getCharacter);

export default router;