import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setIntent, setShops } from "../store/shopSlice";

import BotChatBubble from "./BotChatBubble";
import UserChatBubble from "./UserChatBubble";

import sendIcon from "../assets/send-message.png";
import attachIcon from "../assets/attachment_237510.png";

function ChatWindow({ messages, setMessages }) {
  const dispatch = useDispatch();
  const [enableChatInput, setEnableChatInput] = useState(true);
  const [enableImageUpload, setEnableImageUpload] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [mappedMessages, setMappedMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // function scrollToBottom() {
  //   setTimeout(() => {
  //     messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  //   }, 100);
  // }

  function mapBotAndUserMessages() {
    const mapped = messages
    .map((message, index) =>
      message.sender === "user" ? (
        <UserChatBubble
          key={index}
          message={message.text}
          isLatest={index === messages.length - 1}
        />
      ) : (
        <BotChatBubble
          key={index}
          message={message.text}
          isLatest={index === messages.length - 1}
        />
      )
    )
    .reverse(); // Reverse the order of messages

  setMappedMessages(mapped);
  }

  /*
    Triggered when messages state changes, do not put backend calls into this.
    useEffect calls backend -> backend replies -> state messages updates -> useEffect triggered again
    -> infinite loop -> API money = 0;
  */
  useEffect(() => {
    // scrollToBottom();
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
      const updatedMessages = [
        ...messages,
        { sender: "bot", text: messageReply.nextMessage },
      ];
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
    setNewMessage("");
  }

  async function getBotReply(content, currentMessages) {
    try {
      setEnableChatInput(false);

      const response = await fetch("http://localhost:8080/chat/newMessage", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ role: "user", content: content }),
      });
      var msg = await response.json();
      const updatedMessages = [
        ...currentMessages,
        { sender: "bot", text: msg.content },
      ];
      setMessages(updatedMessages);

      // Take viewShops and initialize ViewWindow grid with ShopCards
      dispatch(setShops(msg.viewShops));
      dispatch(setIntent(msg.intent));

      setEnableImageUpload(msg.intent === "ADD_REVIEW" ? true : false);
    } catch (e) {
      console.error(e);
    } finally {
      setEnableChatInput(true);
    }
  }

  function handleTextInputChange(e) {
    if (e.target.value.length <= 140) {
      // limit input to 140 characters
      setNewMessage(e.target.value);
    }
  }

  function handleEnterKeyDown(event) {
    if (event.key === "Enter" && enableChatInput && newMessage.trim() !== "") {
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
      .then((response) => shareUploadedFilename(response))
      .then(addImageToChatWindow(URL.createObjectURL(file)))
      .catch((error) => {
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
        body: JSON.stringify({
          role: "user",
          content: `uploaded imageId: ${imageId}`,
        }),
      });
      var msg = await response.json(); // unused result
    } catch (e) {
      console.error(e);
    }
  }

  function addImageToChatWindow(imageUrl) {
    setMessages([...messages, { sender: "user", text: imageUrl }]);
  }

  return (
    <div className="ChatWindow flex flex-col h-screen px-3 pb-3">
      <div className="MessageArea flex-1 flex flex-col-reverse space-y-4 px-4 pb-4 h-full overflow-y-auto">
        {mappedMessages}
        {/* <div ref={messagesEndRef} /> */}
      </div>
      <div className="InputArea flex items-center border-2 border-gray-100 rounded-xl bg-white shadow-lg">
        <label
          className={`py-2 px-2 text-white rounded-xl ${
            enableImageUpload ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          <img
            src={attachIcon}
            alt="Add Image"
            className={`w-5 h-5 ${
              enableImageUpload ? "opacity-100" : "opacity-50"
            }`}
          />
          <input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            className="hidden"
            disabled={!enableImageUpload}
          />
        </label>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border-none rounded-lg focus:outline-none"
          value={newMessage}
          onChange={handleTextInputChange}
          onKeyDown={handleEnterKeyDown}
        />
        <button
          type="submit"
          className={`py-2 px-4 rounded-xl focus:outline-none ${
            !enableChatInput || newMessage.trim() === ""
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={handleSendMessage}
          disabled={!enableChatInput || newMessage.trim() === ""}
        >
          <img
            src={sendIcon}
            alt="Send"
            className={`w-5 h-5 ${
              enableChatInput && newMessage.trim() !== ""
                ? "opacity-100"
                : "opacity-50"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
