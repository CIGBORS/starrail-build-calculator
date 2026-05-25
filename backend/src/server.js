import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import testRoutes from "./routes/test.routes.js";
import charactersRoutes from "./routes/starRail/characters.routes.js";
import lightConesRoutes from "./routes/starRail/light-cones.routes.js";
import relicsRoutes from "./routes/starRail/relics.routes.js";
import loginRoutes from "./routes/login/login.routes.js";
import avatarsRoutes from "./routes/starRail/avatars.routes.js";
import calculatorRoutes from "./routes/starRail/calculator.routes.js";

import redis from "../redis/redisClient.js";

const app = express();

// Segurança - Headers HTTP
app.use(helmet());

// Segurança - Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200, // Limita cada IP a 200 requisições por `window` (aqui, por 15 minutos)
  standardHeaders: true, // Retorna informação de limite nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilita os headers `X-RateLimit-*`
  message: { error: "Muitas requisições deste IP, tente novamente após 15 minutos" }
});

app.use(cors());
app.use(json());

// Aplica o rate limiter nas rotas da API
app.use("/api", apiLimiter);

app.use("/test", testRoutes);
app.use("/api/github/characters", charactersRoutes);
app.use("/api/github/avatars", avatarsRoutes);
app.use("/api/github/light-cones", lightConesRoutes);
app.use("/api/github/relics", relicsRoutes);
app.use("/api/github/calculator", calculatorRoutes);
app.use("/api/login", loginRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
