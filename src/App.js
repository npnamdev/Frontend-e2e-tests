import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://socket-io-server-rj2h.onrender.com');

function App() {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('updateInput', (data) => {
      setInputValue(data); // Cập nhật giá trị input từ server
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (event) => {
    const newValue = event.target.value; // Lưu trữ giá trị mới từ sự kiện thay đổi
    setInputValue(newValue); // Cập nhật giá trị input với giá trị mới
  
    // Gửi giá trị input mới lên server
    socket.emit('updateInput', newValue); 
  };
  

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
}

export default App;
