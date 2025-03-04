import SendIcon from "../Send/SendIcon.jsx"
import { useState } from "react"

const Controls = ({ onSend }) => {
    const [content, setContent] = useState("");

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleContentSend = () => {
        if(content.length > 0){
            onSend(content);
            setContent("");
        }
    }

    const handleEnterPress = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            handleContentSend();
        }
    }
    return (
        <div className="flex items-center gap-2 w-full">
          <div className="flex-grow p-2 px-4 rounded-2xl bg-white leading-none">
            <textarea className="w-full h-full border-none outline-none resize-none bg-white" placeholder="Message AI Chatbot" value={content} onChange={handleContentChange} onKeyDown={handleEnterPress}/>
          </div>
          <button className="flex justify-center items-center w-9 h-9 rounded-full bg-black outline-none border-none cursor-pointer" onClick={handleContentSend}>
            <SendIcon />
          </button>
        </div>
    );
}

export default Controls
