import { Router } from "express";
import { login, register } from "../../controllers/login.controller.js";
import { getUsersOnline } from "../../controllers/login.controller.js";
const router = Router();

router.post("/", login);
router.post("/register", register);
router.get("/users-online", getUsersOnline);

export default router;
