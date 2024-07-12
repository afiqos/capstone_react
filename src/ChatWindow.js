import { useEffect, useRef, useState } from "react";
import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "This is bot"},
    { sender: "bot", text: "This is also from bot"},
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }

  function mapBotAndUserMessages() {
    const mapped = messages.map((message, index) => message.sender === "user" ?
      <UserChatBubble key={index} message={message.text} />
      :
      <BotChatBubble key={index} message={message.text} />
    );
    setMappedMessages(mapped);
  }

  useEffect(() => {
    scrollToBottom();
    mapBotAndUserMessages();
  }, [messages]);

  function handleSendMessage(event) {
    event.preventDefault();
    const updatedMessages = [...messages, { sender: "user", text: newMessage }];
    setMessages(updatedMessages);
    getBotReply(newMessage, updatedMessages);
    setNewMessage('');
  }

  async function getBotReply(content, currentMessages) {
    try {
      const response = await fetch("http://localhost:8080/chat/testAPI", {
      // const response = await fetch("http://localhost:8080/chat/userMessage", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ role: "user", content: content }),
      });
      var msg = await response.json();
      const updatedMessages = [...currentMessages, { sender: "bot", text: msg.content }];
      setMessages(updatedMessages);
    } catch (e) {
      console.error(e);
    }
  }

  function handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      handleSendMessage(event);
    }
  }

  return (
      <div className="ChatWindow flex flex-col bottom-10 h-screen">
        <div className="flex-1 space-y-4 px-4 h-full overflow-y-auto">
          {mappedMessages}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-10 mb-5 ml-5 mr-5 flex items-center pl-2 border-2 border-gray-100 rounded-xl">
          <input type="text" placeholder="Type your message..." className="flex-1" value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} onKeyDown={handleEnterKeyDown}/>
          <button type="submit" className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none" onClick={handleSendMessage}>Send</button>
        </div>

      </div>
    );
}

export default ChatWindow;