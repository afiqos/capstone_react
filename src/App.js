import './App.css';
import React, { useState, useEffect } from 'react';
import ChatWindow from "./ChatWindow";

function App() {
  return (
    <div className="App">
      <div className='flex h-screen'>
        <div className='w-2/5 border-r border-gray-100'>
          <ChatWindow />
        </div>
        <div className='w-3/5'>
        </div>
      </div>
    </div>
  );
}

export default App;
