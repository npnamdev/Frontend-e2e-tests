import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const App = () => {
  const code = `const helloWorld = () => {
    console.log('Hello, World!');
  };`;

  const handleEditorChange = (newValue, e) => {
    // Xử lý sự kiện thay đổi nếu cần thiết
    console.log('onChange', newValue, e);
  };

  return (
    <div>
      <h1>React App</h1>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark" // Chọn theme theo ý muốn
        value={code}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default App;
