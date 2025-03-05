import SendIcon from "../Send/SendIcon.jsx"
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react"

const Controls = ({ isDisabled=false, onSend }) => {
    const textareaRef = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!isDisabled){
            textareaRef.current.focus();
        }
    }, [isDisabled])

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
            <TextareaAutosize 
                className="w-full h-full border-none outline-none resize-none bg-white" 
                disabled={isDisabled}
                ref={textareaRef}
                placeholder="Message AI Chatbot" 
                value={content} 
                minRows={1}
                maxRows={5}
                onChange={handleContentChange} 
                onKeyDown={handleEnterPress}
            />
          </div>
          <button 
            className='flex justify-center items-center w-9 h-9 rounded-full bg-black outline-none border-none hover:opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
            onClick={handleContentSend}
            disabled={isDisabled}
            >
                <SendIcon />
          </button>
        </div>
    );
}

export default Controls
