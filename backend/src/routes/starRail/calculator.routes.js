import express from "express";
import { calculateCharacterBuild, saveCharacterBuild, getTopBuildsStats } from "../../controllers/calculator.controller.js";

const calculatorRouter = express.Router();

calculatorRouter.post("/build", calculateCharacterBuild);
calculatorRouter.post("/save", saveCharacterBuild);
calculatorRouter.post("/top-stats", getTopBuildsStats);

export default calculatorRouter;
