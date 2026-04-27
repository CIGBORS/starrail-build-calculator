import { Router } from "express";
import { login, register, getUsersOnline, registerNewLog } from "../../controllers/login.controller.js";

const router = Router();

router.post("/", login);
router.post("/register", register);
router.post("/log", registerNewLog)
router.get("/users-online", getUsersOnline);

export default router;