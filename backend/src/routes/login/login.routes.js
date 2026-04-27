import { Router } from "express";
import { login, register, getUsuarios, changeUser, getUsersOnline, registerNewLog } from "../../controllers/login.controller.js";
import { getUsersOnline } from "../../controllers/login.controller.js";

const router = Router();

router.post("/", login);
router.post("/register", register);
router.put("/usuarios/:id", changeUser);

router.post("/log", registerNewLog)
router.get("/users-online", getUsersOnline);
router.get("/usuarios", getUsuarios);

export default router;