import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Game } from "./src/models/game.js";
// import { HfInference } from "@huggingface/inference";
// import { OpenAI } from "openai";
// import { HuggingFaceChatService } from "./src/backend-services/huggingFaceService.js";
import gameStateRouter, { setGame } from "./src/api/gameState.js";
import memoryRouter, { setGame as setMemoryGame } from "./src/api/memory.js";
import chatRouter, {
  setChatService,
  setGame as setChatServiceGame,
} from "./src/api/chat.js";
import {
  ascii,
  order,
  alignments,
  leftTable,
  rightTable,
  bathroom,
} from "./constants.js";
import { rateLimit } from "./src/middleware/rateLimit.js";
import { SimpleChatService } from "./src/backend-services/simpleService.js";

dotenv.config();

// real chat services here
// const openai = new OpenAI(process.env.OPENAI_API_KEY);
// const openAIChatService = new OpenAIChatService(openai);

// const huggingFace = new HfInference(process.env.HUGGING_FACE_API_KEY);
// const huggingFaceChatService = new HuggingFaceChatService(huggingFace);

const simpleChatService = new SimpleChatService();

setChatService(simpleChatService);

const app = express();
const httpServer = createServer(app);
const port = 3000;
const updateInterval = 50;

const apiLimiter = rateLimit({
  limit: 100, // max 100 requests
  windowMs: 15 * 60 * 1000, // 15 minutes window
});

const game = new Game(order, alignments, leftTable, rightTable, bathroom);
setGame(game);
setChatServiceGame(game);
setMemoryGame(game);

setInterval(() => {
  game.update();
}, updateInterval);

app.use(express.json());
app.use("/api/memory", memoryRouter);
app.use("/api/game", gameStateRouter);
app.use("/api/chat", chatRouter, apiLimiter);

app.use(express.static("public"));

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(ascii);
});
