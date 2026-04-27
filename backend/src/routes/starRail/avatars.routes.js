import { Router } from "express";
import {
  getAllAvatars,
} from "../../controllers/starRail.controller.js";

const router = Router();

router.get("/all", getAllAvatars);

export default router;
