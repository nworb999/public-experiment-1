import { ChatService } from "./chatService.js";

export class DumbChatService extends ChatService {
  constructor() {
    super();
  }

  async sendPrompt(prompt) {
    const { characters, topic } = prompt;
    const scores = {};
    for (const character in characters) {
      if (characters.hasOwnProperty(character)) {
        scores[character] = {};

        // Loop through other characters
        for (const otherCharacter in characters) {
          if (
            characters.hasOwnProperty(otherCharacter) &&
            otherCharacter !== character
          ) {
            // Assuming topicAffinityScores is a predefined object
            const affinityScore = characters[otherCharacter];
            scores[character][otherCharacter] = affinityScore;
          }
        }
      }
    }

    return scores;
  }
}
