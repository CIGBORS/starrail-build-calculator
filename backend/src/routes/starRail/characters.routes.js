import { Router } from "express";
import {
  getCharacter,
  getCharacterAllInformations,
  getCharacterByName,
  getCharacters,
  getCharactersFilters,
} from "../../controllers/starRail.controller.js";

const router = Router();

router.get("/all", getCharacters);
router.get("/all/:id", getCharacterAllInformations);
router.post("/filters", getCharactersFilters);
router.get("/:id", getCharacter);
router.get("/by-name/:name", getCharacterByName);

export default router;
