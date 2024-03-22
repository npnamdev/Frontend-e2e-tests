import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { color } from '@uiw/codemirror-extensions-color';
import * as events from '@uiw/codemirror-extensions-events';
import { javascript } from '@codemirror/lang-javascript';

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

  return (
    <div>
      <CodeMirror
        value={inputValue}
        height="100vh"
        width='100%'
        style={{ fontSize: '14px' }}
        theme={andromeda}
        extensions={[color, javascript({ jsx: true }), EditorView.lineWrapping, eventExt]}
        onChange={handleCodeMiroorChange}
        placeholder="Please enter the code."
      />
    </div>
  );
}

export default App;
