import { topicAffinityScores } from "../backend-services/topicService.js";

// these are all fails by the way I'm keeping them because they are funny.
// I spent half an hour thinking about how to pre-bake the data by string formatting
// the prompts and pasting the results until I finally did the math and realized
// there are over 1200 different outcomes

// giving up with GPT-2
export function formatCharacterInteractionsForBaking() {
  let csvContent = "Prompt\n"; // CSV header

  for (const character in topicAffinityScores) {
    for (const topic in topicAffinityScores[character]) {
      const affinity = topicAffinityScores[character][topic];
      const prompt =
        `Given the topic '${topic}' and the character affinities towards that topic (${character}: ${affinity}), ` +
        `please provide a one-sentence summary of a conversation that reflects their chemistry and interests in the topic. ` +
        `Also, provide a list of scores (from 1 to 10) for each character's impression of the others during the conversation, for 12 responses total. ` +
        `The scores should reflect how positively or negatively each character viewed the others' contributions and interactions related to the topic '${topic}'.`;
      csvContent += `"${prompt.replace(/\n/g, " ")}"\n`; // Replace newline characters with spaces
    }
  }

  return csvContent;
}

export function formatCharacterInteractions() {
  let csvContent = "Prompt\n"; // CSV header

  // Function to generate combinations of characters
  function* generateCombinations(arr, size) {
    function* doGenerateCombinations(offset, combo) {
      if (combo.length === size) {
        yield combo;
        return;
      }
      for (let i = offset; i < arr.length; i++) {
        yield* doGenerateCombinations(i + 1, combo.concat(arr[i]));
      }
    }
    yield* doGenerateCombinations(0, []);
  }

  // Get all unique topics
  const allTopics = new Set();
  for (const character in topicAffinityScores) {
    for (const topic in topicAffinityScores[character]) {
      allTopics.add(topic);
    }
  }

  // Get all character names
  const characters = Object.keys(topicAffinityScores);

  // Generate all combinations of four characters
  const characterCombinations = [...generateCombinations(characters, 4)];

  // Iterate over each combination of characters and each topic
  for (const charCombo of characterCombinations) {
    for (const topic of allTopics) {
      let prompt = `Given the topic '${topic}', `;

      charCombo.forEach((character, index) => {
        const affinity = topicAffinityScores[character][topic] ?? "N/A";
        prompt += `${index > 0 ? ", " : ""}${character}: ${affinity}`;
      });

      prompt +=
        `. Please provide a one-sentence summary of a conversation that reflects their chemistry and interests in the topic. ` +
        `Also, provide a list of scores (from 1 to 10) for each character's impression of the others during the conversation, for 12 responses total. ` +
        `The scores should reflect how positively or negatively each character viewed the others' contributions and interactions related to the topic '${topic}'.`;
      csvContent += `"${prompt.replace(/\n/g, " ")}"\n`;
    }
  }

  return csvContent;
}
