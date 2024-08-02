import './App.css';
import React, { useState, useEffect } from 'react';
import ChatWindow from "./components/ChatWindow";
import ViewWindow from './components/ViewWindow';

function App() {
  return (
    <div className="App flex h-screen">
      <div className="w-2/5 border-r border-gray-100">
        <ChatWindow />
      </div>
      <div className="w-3/5">
        <ViewWindow />
      </div>
    </div>
  );
}

export default App;
