import express from "express";
import { ChatService } from "../backend-services/chatService.js";
import { runSimpleConversationPrompts } from "../utils/prompts.js";

const router = express.Router();

export let chatService = new ChatService();

router.post("/prompt", (req, res) => {
  try {
    const gameState = req.body.gameState;

    // for use with not simple chat services
    // const { leftTableResponse, rightTableResponse } =
    //   runConversationPrompts(gameState);

    const { leftTableResponse, rightTableResponse } =
      runSimpleConversationPrompts(gameState);
    console.log(`${new Date().toISOString()} returning  prompt responses`);
    console.log({ leftTableResponse });
    console.log({ rightTableResponse });
    // something is happening here -- it is not being set synchronously
    res.json({
      message: { leftTable: leftTableResponse, rightTable: rightTableResponse },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export function setChatService(service) {
  chatService = service;
}

export { router as default };
