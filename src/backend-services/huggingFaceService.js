import { ChatService } from "./chatService.js";

export class HuggingFaceChatService extends ChatService {
  constructor(huggingFaceInstance) {
    super();
    this.huggingface = huggingFaceInstance;
  }

  async sendPrompt(prompt) {
    console.log(prompt);
    const response = await this.huggingface.conversational({
      model: "microsoft/DialoGPT-large",
      inputs: {
        text: prompt, // "Return 4 random numbers between 1 and 10",
      },
    });
    const result = response["generated_text"];
    console.log({ result });
    return result;
  }
}
