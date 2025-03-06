import Chat from "./components/Chat/Chat.jsx"
import { useState } from "react"
import { AssistantGemini } from "./assistants/gemini.js"
import { AssistantOpenAI } from "./assistants/openai.js"
import { MESSAGES } from "./components/constants.js"
import Controls from "./components/Controls/Controls.jsx"
import Loader from "./components/Loader/Loader.jsx"
import { AssistantDeepSeekAI } from "./assistants/deepseekai.js"



const App = () => {
  const assistant = new AssistantGemini();
  const openai = new AssistantOpenAI();
  const deepseekai = new AssistantDeepSeekAI();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const updateLastMessage = (content) => {
    setMessages((prevMessages) => prevMessages.map((message, index) => index === prevMessages.length - 1 ? { ...message, content: `${message.content} ${content}` } : message));
  };

  const handleContentSend = async (content) => {
    setMessages([...messages, { role: "user", content }]);
    setIsLoading(true);
    try{
      const response = assistant.chatStream(content);
      let isFirstChunk = false;
      for await (const chunk of response){
        if(!isFirstChunk){
          isFirstChunk = true;
          setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "" }]);
          setIsLoading(false);
          setIsStreaming(true);
        }

        updateLastMessage(chunk);
      }
      setIsStreaming(false);
    }
    catch(error) 
    {
      setMessages([...messages, { role: "user", content }, { role: "assistant", content: "Something went wrong" }]);
      setIsLoading(false);
      setIsStreaming(false);
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
      <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend}/>
    </div>
  )
}

export default App

