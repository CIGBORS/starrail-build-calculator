import { Router } from "express";
import {
  getLCFilters,
  getAllLCCards,
} from "../../controllers/starRail.controller.js";

const router = Router();

router.post("/filters", getLCFilters);
router.post("/all-cards", getAllLCCards);

export default router;
