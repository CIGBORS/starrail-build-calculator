import { Router } from "express";
import {
  getRelicsFilters,
  getAllRelicsCards,
} from "../../controllers/starRail.controller.js";

const router = Router();

router.post("/filters", getRelicsFilters);
router.post("/all-cards", getAllRelicsCards);

export default router;
