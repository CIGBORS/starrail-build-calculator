import express from "express";
import { calculateCharacterBuild, saveCharacterBuild } from "../../controllers/calculator.controller.js";

const calculatorRouter = express.Router();

calculatorRouter.post("/build", calculateCharacterBuild);
calculatorRouter.post("/save", saveCharacterBuild);

export default calculatorRouter;
