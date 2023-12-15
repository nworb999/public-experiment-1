import { setGameMemory } from "./gameState.js";

let memory = {};

// api
export function storeNewMemories(outcomes) {
  fetch("/api/memory/store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      outcomes,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log("memory stored"))
    .catch((error) => console.error("Error storing memory:", error));
}
export function readMemoryData() {
  fetch("/api/memory/retrieve")
    .then((response) => response.json())
    .then((memoryData) => {
      console.log("retrieving memory data");
      memory = memoryData;
    })
    .catch((error) => console.error("Error fetching memory:", error));
}

// utils
export function refreshGameMemory() {
  readMemoryData();
  setGameMemory(memory);
}
