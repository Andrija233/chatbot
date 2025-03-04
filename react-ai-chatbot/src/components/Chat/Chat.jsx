import { WELCOME_MESSAGE } from "../constants"

const Chat = ({messages}) => {
  return (
    <div className="flex flex-col gap-2 h-full p-2 overflow-y-auto">
      {[WELCOME_MESSAGE, ...messages].map(({role, content}, index) => (
        <div  className={`w-[90%] px-4 rounded-2xl text-sm ${role === "user" ? "self-end bg-gray-200" : ""}`} key={index} data-role={role}>
            {content}
        </div>   
      ))}
    </div>
  )
}

export default Chat
