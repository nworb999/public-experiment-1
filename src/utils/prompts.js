import { getConversationTopicAndAffinities } from "../backend-services/topicService.js";
import { chatService } from "../api/chat.js";

export async function runDumbConversationPrompts(gameState) {
  const leftTable = gameState.leftTable;
  const rightTable = gameState.rightTable;

  // this will be combined with memory in the interactWith function to produce the final result
  const { topic: leftTableTopic, affinities: leftTableAffinities } =
    getConversationTopicAndAffinities(
      leftTable.seats.map(
        ({
          character: {
            alignment: { name },
          },
        }) => name
      )
    );
  const { topic: rightTableTopic, affinities: rightTableAffinities } =
    getConversationTopicAndAffinities(
      rightTable.seats.map(
        ({
          character: {
            alignment: { name },
          },
        }) => name
      )
    );

  const leftTableResponse = await chatService.sendPrompt({
    characters: leftTableAffinities,
    topic: leftTableTopic,
  });

  const rightTableResponse = await chatService.sendPrompt({
    characters: rightTableAffinities,
    topic: rightTableTopic,
  });
  return { leftTableResponse, rightTableResponse };
}

// run this for openAI or hugging face chat services
export async function runConversationPrompts(gameState) {
  const leftTable = gameState.leftTable;
  const rightTable = gameState.rightTable;

  // this will be combined with memory in the interactWith function to produce the final result
  const { topic: leftTableTopic, affinities: leftTableAffinities } =
    getConversationTopicAndAffinities(
      leftTable.seats.map(
        ({
          character: {
            alignment: { name },
          },
        }) => name
      )
    );
  const { topic: rightTableTopic, affinities: rightTableAffinities } =
    getConversationTopicAndAffinities(
      rightTable.seats.map(
        ({
          character: {
            alignment: { name },
          },
        }) => name
      )
    );

  const rightTablePrompt = formatPrompts(rightTableTopic, rightTableAffinities);
  const leftTablePrompt = formatPrompts(leftTableTopic, leftTableAffinities);

  const leftTableResponse = await chatService.sendPrompt(leftTablePrompt);
  const rightTableResponse = await chatService.sendPrompt(rightTablePrompt);
  return { leftTableResponse, rightTableResponse };
}

function formatPrompts(topic, affinities) {
  // Constructing the main part of the prompt
  let prompt = `Given the topic '${topic}' and the character affinities towards that topic (${
    Object.keys(affinities)[0]
  }: ${Object.values(affinities)[0]}, ${Object.keys(affinities)[1]}: ${
    Object.values(affinities)[1]
  },${Object.keys(affinities)[2]}: ${Object.values(affinities)[2]}, ${
    Object.keys(affinities)[3]
  }: ${Object.values(affinities)[3]}), `;
  prompt += `please provide a one-sentence summary of a conversation that reflects their chemistry and interests in the topic. `;

  // Constructing the part for scoring each character's impression of others
  prompt += `Also, provide a list of scores (from 1 to 10) for each character's impression of the others during the conversation, for 12 responses total. `;
  prompt += `The scores should reflect how positively or negatively each character viewed the others' contributions and interactions related to the topic '${topic}'.`;

  return prompt;
}
