import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const CodeHighlighter = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    // Highlight code khi component được mount
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
