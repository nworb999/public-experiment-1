import { ChatService } from "./chatService.js";

export class OpenAIChatService extends ChatService {
  constructor(openaiInstance) {
    super();
    this.openai = openaiInstance;
  }

  async sendPrompt(prompt) {
    return await this.openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "davinci",
    });
  }
}
