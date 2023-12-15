import express from "express";
import { ChatService } from "../backend-services/chatService.js";
import { runDumbConversationPrompts } from "../utils/prompts.js";

const router = express.Router();

export let chatService = new ChatService();

router.post("/prompt", async (req, res) => {
  try {
    const gameState = req.body.gameState;

    // for use with not dumb chat services
    // const { leftTableResponse, rightTableResponse } =
    //   runConversationPrompts(gameState);

    const { leftTableResponse, rightTableResponse } =
      await runDumbConversationPrompts(gameState);

    const response = {
      message: { leftTable: leftTableResponse, rightTable: rightTableResponse },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export function setChatService(service) {
  chatService = service;
}

export { router as default };
