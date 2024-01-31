// #Link Theme:  https://uiwjs.github.io/react-codemirror/

import { darcula } from '@uiw/codemirror-theme-darcula';
import * as events from '@uiw/codemirror-extensions-events';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view"
import { useState } from 'react';

import { color } from '@uiw/codemirror-extensions-color';

function App() {
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
    <CodeMirror
      value="body { color: #333333; }"
      height="100vh"
      width='100%'
      style={{fontSize: '14px'}}
      theme={darcula}
      extensions={[color, javascript({ jsx: true }),EditorView.lineWrapping, eventExt]}
      onChange={(value, viewUpdate) => { console.log('value:', value);}}
    />
  );
}
export default App;
