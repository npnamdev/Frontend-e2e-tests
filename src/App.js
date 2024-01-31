import React from 'react';
import CodeHighlighter from './components/CodeHighlighter';

const App = () => {
  const code = `const helloWorld = () => {
  console.log('Hello, World!');
};`;

  return (
    <div>
      <h1>React App</h1>
      <CodeHighlighter code={code} language="javascript" />
    </div>
  );
};

export default App;
