import { useEffect, useRef, useState } from "react";
import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "This is bot"},
    { sender: "bot", text: "This is also from bot"},
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSendMessage(event) {
    event.preventDefault();
    setMessages([... messages, { sender: "user", text: newMessage }]);
    setNewMessage('');
  }

  function handleBotSendMessage(event) {
    event.preventDefault();
    setMessages([... messages, { sender: "bot", text: newMessage }]);
    setNewMessage('');
  }

  return (
      <div className="ChatWindow flex flex-col bottom-10 h-screen">
        <div className='flex-1 space-y-4 px-4 h-full overflow-y-auto'>
          {messages.map((message, index) => message.sender === "user" ? 
            <UserChatBubble key={index} message={message.text} />
            :
            <BotChatBubble key={index} message={message.text} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-10 mb-5 ml-5 mr-5 flex items-center pl-2 border-2 border-gray-100 rounded-xl">
          <input type="text" placeholder="Type your message..." className="flex-1" value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }}/>
          <button type='submit' className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none" onClick={handleSendMessage}>Send</button>
        </div>

        <button onClick={handleBotSendMessage}>Bot Reply</button>
      </div>
    );
}

export default ChatWindow;