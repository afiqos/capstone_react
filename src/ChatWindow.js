import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

function ChatWindow() {
    return (
      <div className="ChatWindow flex flex-col bottom-10 h-screen">
        <div className='flex-1 space-y-4 px-4 h-full'>
          <UserChatBubble message={"Message from user"} />
          <BotChatBubble message={"Message from bot"} />
          <BotChatBubble message={"Message from bot"} />
          <BotChatBubble message={"Message from bot"} />
          <UserChatBubble message={"Message from user"} />
        </div>
        <div className="h-10 mb-5 ml-5 mr-5 flex items-center pl-2 border-2 border-gray-100 rounded-xl">
          <input type="text" placeholder="Type your message..." className="flex-1" />
          <button className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none">Send</button>
        </div>
      </div>
    );
}

export default ChatWindow;