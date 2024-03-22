import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("https://socket-io-server-6592.onrender.com", {
  transports: ["websocket"]
});

function App() {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('updateInput', (data) => {
      setInputValue(data); 
    });

    return () => {
      socket.off('updateInput');
    };
  }, []); 

  const handleInputChange = (event) => {
    const newValue = event.target.value; 
    setInputValue(newValue); 
    socket.emit('updateInput', newValue); 
  };

  return (
    <div>
      <textarea
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
}

export default App;
