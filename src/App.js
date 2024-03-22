import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { color } from '@uiw/codemirror-extensions-color';
import * as events from '@uiw/codemirror-extensions-events';
import { javascript } from '@codemirror/lang-javascript';

// const socket = io("http://localhost:4000", {
//   transports: ["websocket"]
// });
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

  const handleCodeMiroorChange = (value, viewUpdate) => {
    const newValue = value;
    setInputValue(newValue);
    socket.emit('updateInput', newValue);
  };

  const eventExt = events.content({
    focus: (evn) => {
      console.log('focus');
    },
    blur: (evn) => {
      console.log('blur');
    },
    keydown: (evn) => {
      if (evn.ctrlKey && evn.code === 'KeyS') {
        console.log('Saved!');
        evn.preventDefault();
      }
    },
  });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
      // scrollToBottom();
    });

    socket.on('load messages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Load messages from server when component mounts
    socket.emit('load messages');

    socket.on('user connected', (username) => {
      setOnlineUsers([...onlineUsers, username]);
    });

    socket.on('user disconnected', (username) => {
      setOnlineUsers(onlineUsers.filter(user => user !== username));
    });

    return () => {
      socket.off('chat message');
      socket.off('load messages');
      socket.off('user connected');
      socket.off('user disconnected');
    };
  }, [messages, onlineUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const msg = { username, message: input };
      socket.emit('chat message', msg);
      setInput('');
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setIsUsernameSet(true);
      socket.emit('set username', username);
    }
  };

  return (
    <div className='app-container'>
      {!isUsernameSet ? (
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Set Username</button>
        </form>
      ) : (
        <>
          <CodeMirror
            value={inputValue}
            height="100vh"
            style={{ fontSize: '14px', }}
            theme={andromeda}
            extensions={[color, javascript({ jsx: true }), EditorView.lineWrapping, eventExt]}
            onChange={handleCodeMiroorChange}
            placeholder="Please enter the code."
          />
          <div className='demonam'>
            <h2>Online</h2>
            <ul>
                {onlineUsers.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
            </ul>
          </div>


          {/* <div className="chat-container">
            <div>
              <h3>Online Users:</h3>
              <ul style={{ borderBottom: '1px solid black' }}>
                {onlineUsers.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
            <ul className="message-container" style={{ height: '85vh', overflow: 'auto', }}>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={`message ${msg.username === username ? 'sent' : 'received'}`}
                >
                  {msg.username}: {msg.message}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit">Send</button>
            </form>
          </div> */}
        </>
      )}
    </div>
  );
}

export default App;
