import OpenAI from "openai";
import { AssistantOpenAI } from "./openai.js";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class AssistantDeepSeekAI extends AssistantOpenAI {
    constructor(model="deepseek-chat", client = openai) {
      super(model, client);
    }
}

