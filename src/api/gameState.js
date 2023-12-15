import express from "express";

const router = express.Router();

let game;

router.post("/start", (req, res) => {
  if (game) {
    console.log(`${new Date().toISOString()} :: starting game`);
    game.startGame();
    res.json({ message: "game started" });
  } else {
    res.status(400).json({ message: "game not started " });
  }
});

router.post("/memory", (req, res) => {
  const memory = req.body.memory;
  if (game) {
    console.log(
      `${new Date().toISOString()} :: setting memory : `,
      Object.keys(memory).length
    );
    game.setMemory(memory);
    res.json({ message: "memory set" });
  } else {
    res.status(400).json({ message: "memory not set" });
  }
});

router.get("/state", (req, res) => {
  if (game) {
    res.json(game.getState());
  } else {
    res.status(404).json({ message: "game state not fetched" });
  }
});

router.post("/conversation", (req, res) => {
  const conversation = req.body.conversation;
  if (game) {
    console.log(`${new Date().toISOString()} :: setting conversation`);

    game.setConversation(conversation);
  } else {
    res.status(400).json({ message: "conversation not set" });
  }
});

function setGame(gameInstance) {
  game = gameInstance;
}

export { router as default, setGame };
