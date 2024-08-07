import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setShops } from "../store/shopSlice";

import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

function ChatWindow({messages, setMessages}) {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [mappedMessages, setMappedMessages] = useState([]);
  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  }

  function mapBotAndUserMessages() {
    const mapped = messages.map((message, index) => message.sender === "user" ?
      <UserChatBubble key={index} message={message.text} />
      :
      <BotChatBubble key={index} message={message.text} />
    );
    setMappedMessages(mapped);
  }

  /*
    Triggered when messages state changes, do not put backend calls into this.
    useEffect calls backend -> backend replies -> state messages updates -> useEffect triggered again
    -> infinite loop -> API money = 0;
  */
  useEffect(() => {
    scrollToBottom();
    mapBotAndUserMessages();
  }, [messages]);

  async function getInitMessage() {
    try {
      console.log("start");
      // const response = await fetch("http://localhost:8080/chat/testAPI", {
      const response = await fetch("http://localhost:8080/chat/firstMessage", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      var msg = await response.json();
      var messageReply = JSON.parse(msg.content);
      const updatedMessages = [...messages, { sender: "bot", text: messageReply.nextMessage}];
      setMessages(updatedMessages);
      console.log("end");
    } catch (error) {
      console.error(error); 
    }
  }

  // This empty array useEffect will only run on initial render
  useEffect(() => {
    getInitMessage();
  }, []);


  function handleSendMessage(event) {
    event.preventDefault();
    const updatedMessages = [...messages, { sender: "user", text: newMessage }];
    setMessages(updatedMessages);
    getBotReply(newMessage, updatedMessages);
    setNewMessage('');
  }

  async function getBotReply(content, currentMessages) {
    try {
      const response = await fetch("http://localhost:8080/chat/newMessage", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ role: "user", content: content }),
      });
      var msg = await response.json();
      const updatedMessages = [...currentMessages, { sender: "bot", text: msg.content }];
      setMessages(updatedMessages);

      // Take viewShops and initialize ViewWindow grid with ShopCards
      dispatch(setShops(msg.viewShops));
    } catch (e) {
      console.error(e);
    }
  }

  function handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      handleSendMessage(event);
    }
  }
  
  function handleFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      processImage(file);
    }
  }

  async function processImage(file) {
    uploadImage(file)
    .then(response => shareUploadedFilename(response))
    .then(addImageToChatWindow(URL.createObjectURL(file)))
    .catch(error => {
      console.error("Error: ", error);
    });
  }

  // uploads image immediately after image picked
  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    try {
      const response = await fetch("http://localhost:8080/image/upload", {
        method: "POST",
        body: formData,
      });
      var msg = await response.json();
      return await msg.imageId;
    } catch (e) {
      console.error(e);
    }
  }

  async function shareUploadedFilename(imageId) {
    try {
      const response = await fetch("http://localhost:8080/chat/newMessage", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ role: "user", content: `uploaded imageId: ${imageId}` }),
      });
      var msg = await response.json(); // unused result
    } catch (e) {
      console.error(e);
    }
  }

  function addImageToChatWindow(imageUrl) {
    setMessages([...messages, { sender: "user", text: imageUrl}]);
  }

  return (
      <div className="ChatWindow flex flex-col bottom-10 h-screen">
        <div className="flex-1 space-y-4 px-4 h-full overflow-y-auto">
          {mappedMessages}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-10 mb-5 ml-5 mr-5 flex items-center pl-2 border-2 border-gray-100 rounded-xl">
          <input type="file" name="imageFile" onChange={handleFileChange} />
          <input type="text" placeholder="Type your message..." className="flex-1" value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} onKeyDown={handleEnterKeyDown}/>
          <button type="submit" className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none" onClick={handleSendMessage}>Send</button>
        </div>

      </div>
    );
}

export default ChatWindow;