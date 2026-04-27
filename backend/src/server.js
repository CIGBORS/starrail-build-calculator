import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes.js";
import charactersRoutes from "./routes/starRail/characters.routes.js";
import loginRoutes from "./routes/login/login.routes.js";
import avatarsRoutes from "./routes/starRail/avatars.routes.js";

import redis from "../redis/redisClient.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/test", testRoutes);
app.use("/api/github/characters", charactersRoutes);
app.use("/api/github/avatars", avatarsRoutes);
app.use("/api/login", loginRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
