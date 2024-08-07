import './App.css';
import React, { useState } from 'react';
import ChatWindow from "./components/ChatWindow";
import ViewWindow from './components/ViewWindow';

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="App flex h-screen">
      <div className="w-2/5 border-r border-gray-100">
        <ChatWindow messages={messages} setMessages={setMessages}/>
      </div>
      <div className="w-3/5">
        <ViewWindow messages={messages} setMessages={setMessages}/>
      </div>
    </div>
  );
}

export default App;
