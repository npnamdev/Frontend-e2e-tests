import React, { useState } from 'react';

const TreeNode = ({ node, onToggle, onContextMenu }) => {
  const { name, toggled, children } = node;
  const [isToggled, setToggled] = useState(toggled || false);
  const isFolder = children && children.length > 0;

  const handleToggle = () => {
    setToggled(!isToggled);
    onToggle(node, !isToggled, isFolder);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onContextMenu(node);
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <div onClick={handleToggle}>
        {isFolder && <span>{isToggled ? '[-]' : '[+]'}</span>}
        {name}
      </div>
      {isToggled && isFolder && (
        <div style={{ marginLeft: '20px' }}>
          {children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onToggle={onToggle}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeExample = () => {
  const [data, setData] = useState({
    name: 'root',
    toggled: true,
    children: [
      {
        name: 'src',
        children: [
          {
            name: 'components',
            children: [
              { name: 'codeEditor.jsx' },
              { name: 'TableBlock.jsx' },
            ],
          },
          {
            name: 'styles',
            children: [
              { name: 'main.css' },
              { name: 'style.css' },
            ],
          },
        ],
      },
      { name: 'app.js' },
      { name: 'index.js' },
      { name: '.gitignore' },
      { name: '.package-lock.json' },
      { name: '.package.json' },
      { name: 'README.md' },
    ],
  });

  const onToggle = (clickedNode, toggled, isFolder) => {
    if (isFolder) {
      console.log(`${clickedNode.name} ${toggled ? 'opened' : 'closed'}`);
    } else {
      console.log(`Clicked on file: ${clickedNode.name}`);
    }

    setData((prevData) => ({ ...prevData }));
  };

  const onContextMenu = (clickedNode) => {
    console.log(`Context menu opened for: ${clickedNode.name}`);
    // Your logic for handling context menu, e.g., show a modal for creating file/folder
  };

  return (
    <div>
      <TreeNode
        node={data}
        onToggle={onToggle}
        onContextMenu={onContextMenu}
      />
    </div>
  );
};

export default TreeExample;
