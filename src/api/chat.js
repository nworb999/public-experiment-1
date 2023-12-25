import express from "express";
import { ChatService } from "../backend-services/chatService.js";
import { runSimpleConversationPrompts } from "../utils/prompts.js";

const router = express.Router();

export let chatService = new ChatService();

let game;

router.post("/prompt", (req, res) => {
  try {
    const gameState = req.body.gameState;

    // (for use with not simple chat services)
    // const { leftTableResponse, rightTableResponse } =
    //   runConversationPrompts(gameState);

    const { leftTableResponse, rightTableResponse } =
      runSimpleConversationPrompts(gameState);

    if (game) {
      const conversation = {
        leftTable: leftTableResponse,
        rightTable: rightTableResponse,
      };
      game.setConversation(conversation);
      res.json({
        message: `${new Date().toISOString()} :: setting conversation ${conversation}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export function setChatService(service) {
  chatService = service;
}

export function setGame(gameInstance) {
  game = gameInstance;
}

export { router as default };
