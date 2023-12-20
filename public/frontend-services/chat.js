// would have to rewrite as async with working chatGPT!
export function generateExpectedConversation(gameState) {
  fetch("/api/chat/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameState }),
  })
    .then((response) => {
      console.log({ response });
      return response.json();
    })
    .catch((error) => console.error("Error:", error));
}
