import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true
});

export class AssistantOpenAI {
    #model
    #client
    constructor(model="gpt-4o-mini", client = openai) {
      this.#model = model
      this.#client = client
    }
    async chat(content, history) {
        try {
            const result = await this.#client.chat.completions.create({
                model: this.#model,
                messages: [...history, { role: "user", content }]
            })
            return result.choices[0].message.content;
        } catch (error) {
            console.log(error);
        }
    }
    async *chatStream(content, history) {
        try {
          const result = await this.#client.chat.completions.create({
            model: this.#model,
            messages: [...history, { role: "user", content }],
            stream: true,
          });
    
          for await (const chunk of result) {
            yield chunk.choices[0]?.delta?.content || "";
          }
        } catch (error) {
          console.log(error);
        }
      }
}

