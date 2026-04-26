import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes.js";
import charactersRoutes from "./routes/starRail/characters.routes.js";
import lightConesRoutes from "./routes/starRail/light-cones.routes.js";
import relicsRoutes from "./routes/starRail/relics.routes.js";
import loginRoutes from "./routes/login/login.routes.js";

import redis from "../redis/redisClient.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/test", testRoutes);
app.use("/api/github/characters", charactersRoutes);
app.use("/api/github/light-cones", lightConesRoutes);
app.use("/api/github/relics", relicsRoutes);
app.use("/api/login", loginRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
