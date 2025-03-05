import Chat from "./components/Chat/Chat.jsx"
import { useState } from "react"
import { AssistantGemini } from "./assistants/gemini.js"
import { AssistantOpenAI } from "./assistants/openai.js"
import { MESSAGES } from "./components/constants.js"
import Controls from "./components/Controls/Controls.jsx"
import Loader from "./components/Loader/Loader.jsx"
import { FunctionCallingMode } from "@google/generative-ai"



const App = () => {
  const assistant = new AssistantGemini();
  const openai = new AssistantOpenAI();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleContentSend = async (content) => {
    setMessages([...messages, { role: "user", content }]);
    setIsLoading(true);
    try{
      const response = await assistant.chat(content);
      setMessages([...messages, { role: "user", content }, { role: "assistant", content: response }]);
    }
    catch(error) 
    {
      setMessages([...messages, { role: "user", content }, { role: "assistant", content: "Something went wrong" }]);
    }
    finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 h-screen p-4">
      {isLoading && <Loader />}
      <header className="flex flex-col items-center gap-[5px]">
        <img className="h-[64px] w-[64px]" src="/chat-bot.png" alt="chatbot" />
        <h2 className="text-3xl font-bold text-blue-500 m-0">AI ChatBot</h2>
      </header>
      <div className="flex-grow w-[100%] bg-teal-100 dark:bg-teal-900 rounded-2xl overflow-y-auto">
        <Chat messages={messages} />
      </div>
      <Controls isDisabled={isLoading} onSend={handleContentSend}/>
    </div>
  )
}

export default App

