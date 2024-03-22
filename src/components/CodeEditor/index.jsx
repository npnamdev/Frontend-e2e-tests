// #Link Theme:  https://uiwjs.github.io/react-codemirror/
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { color } from '@uiw/codemirror-extensions-color';
import * as events from '@uiw/codemirror-extensions-events';
import { javascript } from '@codemirror/lang-javascript';

const CodeEditor = (props) => {
  console.log(props.inputValue);
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
      style={{ fontSize: '14px' }}
      theme={andromeda}
      extensions={[color, javascript({ jsx: true }), EditorView.lineWrapping, eventExt]}
      onChange={(value, viewUpdate) => { console.log('value:', value); }}
      placeholder="Please enter the code."
    />
  );
}

export default CodeEditor;
