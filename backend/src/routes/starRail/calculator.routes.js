import express from "express";
import { calculateCharacterBuild, getBuildResult, saveCharacterBuild, getSavedBuilds, deleteCharacterBuild, getTopBuildsStats } from "../../controllers/calculator.controller.js";

const calculatorRouter = express.Router();

calculatorRouter.post("/build", calculateCharacterBuild);
calculatorRouter.get("/result/:jobId", getBuildResult);
calculatorRouter.post("/save", saveCharacterBuild);
calculatorRouter.post("/top-stats", getTopBuildsStats);
calculatorRouter.get("/saved-builds/:userId", getSavedBuilds);
calculatorRouter.delete("/delete-build/:id", deleteCharacterBuild);

export default calculatorRouter;
