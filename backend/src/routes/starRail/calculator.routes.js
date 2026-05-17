import express from "express";
import { calculateCharacterBuild } from "../../controllers/calculator.controller.js";

const calculatorRouter = express.Router();

calculatorRouter.post("/build", calculateCharacterBuild);

export default calculatorRouter;
