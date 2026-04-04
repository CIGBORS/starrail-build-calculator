import { Router } from "express";
import { getCharacter, getCharacterAllInformations, getCharacterByName, getCharacters, getAllCharactersCards } from "../../controllers/starRail.controller.js";

const router = Router();

router.get("/all-cards", getAllCharactersCards);
router.get("/all", getCharacters);
router.get("/all/:id", getCharacterAllInformations);
router.get("/:id", getCharacter);
router.get("/by-name/:name", getCharacterByName);

export default router;