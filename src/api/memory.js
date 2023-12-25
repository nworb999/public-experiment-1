import express from "express";
import { retrieveMemories, storeMemories } from "./utils.js";

const router = express.Router();

let game;

router.get("/retrieve", (req, res) => {
  console.log(`${new Date().toISOString()} :: retrieving character memories`);

  const allConversations = retrieveMemories();
  res.json(allConversations);
});

router.post("/store", (req, res) => {
  const outcomes = req.body.outcomes;
  storeMemories(outcomes);
  game.resetOutcomes();
  res.json({ message: "Memories stored successfully" });
});

function setGame(gameInstance) {
  game = gameInstance;
}

export { router as default, setGame };
