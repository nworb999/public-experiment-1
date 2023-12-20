import { refreshGameMemory, storeNewMemories } from "./memory.js";
import { generateExpectedConversation } from "./chat.js";

let gameState = { characters: [], outcomes: [] };
let previousGameState = "";

// api calls
export function startGame() {
  fetch("/api/game/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function fetchGameState() {
  fetch("/api/game/state")
    .then((response) => response.json())
    .then((data) => {
      gameState = data;
      handleGameState(gameState);
      previousGameState = gameState.state;
    })
    .catch((error) => console.error("Error fetching game state:", error));
}

export function setGameMemory(memory) {
  console.log("memory in sketch :", memory);
  fetch("/api/game/memory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memory }),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export function setGameConversation(conversation) {
  console.log("setting conversation from sketch :", conversation);
  fetch("/api/game/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversation }),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

// utils
export function drawGameState(draw) {
  if (gameState.leftTable && gameState.rightTable && gameState.toilet) {
    draw.furniture(gameState);
  }
  if (gameState.characters) {
    draw.characters(gameState.characters);
  }
}

export function handleGameState() {
  if (
    gameState.state === "choosingSeats" &&
    previousGameState === "conversing" &&
    gameState.outcomes.length
  ) {
    console.log("storing new memories in handleGameState", gameState.outcomes);
    storeNewMemories(gameState.outcomes);
  }

  if (
    gameState.state === "conversing" &&
    previousGameState === "choosingSeats"
  ) {
    console.log("generating expected convo with", gameState);
    const conversation = generateExpectedConversation(gameState);
    console.log("setting expected convo", conversation);
    setGameConversation(conversation);

    if (gameState.turn !== 1) {
      console.log("refreshing game memory in sketch");

      refreshGameMemory();
    }

    startGame();
  }
}
