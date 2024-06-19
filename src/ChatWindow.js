import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

function ChatWindow() {
    return (
      <div className="ChatWindow">
        <div className='flex flex-col space-y-4 px-4 h-full'>
          <UserChatBubble text={"Message from user"} />
          <BotChatBubble message={"Message from bot"} />
        </div>
      </div>
    );
}

export default ChatWindow;