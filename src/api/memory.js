import express from "express";
import { retrieveMemories, storeMemories } from "./utils.js";

const router = express.Router();

router.get("/retrieve", (req, res) => {
  console.log(`${new Date().toISOString()} :: retrieving character memories`);

  const allConversations = retrieveMemories();
  res.json(allConversations);
});

router.post("/store", (req, res) => {
  const outcomes = req.body.outcomes;
  console.log(`${new Date().toISOString()} :: storing character memories`);
  storeMemories(outcomes);

  res.json({ message: "Memories stored successfully" });
});

export { router as default };
