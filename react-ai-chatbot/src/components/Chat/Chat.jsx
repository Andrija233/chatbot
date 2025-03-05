import { useEffect, useRef } from "react";
import { WELCOME_MESSAGE } from "../constants"
import Markdown from "react-markdown";
import { ArrowDown } from "lucide-react";

const Chat = ({messages}) => {
  const messageEndRef = useRef(null);

  // Scroll to the bottom function
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="relative flex flex-col gap-3 h-full p-4 overflow-y-auto bg-gray-100">
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div
          key={index}
          className={`max-w-[80%] px-4 py-2 text-sm rounded-2xl shadow-md ${
          role === "user"
          ? "self-end bg-blue-500 text-white dark:bg-blue-600"
          : "self-start bg-white text-gray-700"
          }`}
          data-role={role}
        >
          <Markdown>{content}</Markdown>
        </div>
      ))}
      <div ref={messageEndRef} />
      {/* Scroll to Bottom Button */}
      <button
        onClick={scrollToBottom}
        className="sticky bottom-4 self-end cursor-pointer hover:scale-110 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Chat
