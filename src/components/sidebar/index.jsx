import { useState } from 'react';

const TreeNode = ({ node, onToggle, onContextMenu, onCreateFile, onCreateFolder, onUpdate, onDelete }) => {
  const { id, name, toggled, type, children } = node;
  const [isToggled, setToggled] = useState(toggled || false);
  const isFolder = type === 'folder';
  const isFile = type === 'file';

  const handleToggle = () => {
    setToggled(!isToggled);
    onToggle(node, !isToggled, isFolder);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onContextMenu(node);
  };

  const handleCreateFile = () => {
    onCreateFile(node);
  };

  const handleCreateFolder = () => {
    onCreateFolder(node);
  };

  const handleUpdate = () => {
    onUpdate(node);
  };

  const handleDelete = () => {
    onDelete(node);
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <div onClick={handleToggle}>
        {isFolder && <span>{isToggled ? '[-]' : '[+]'}</span>}
        {name} (ID: {id})
      </div>
      {isToggled && isFolder && (
        <div style={{ marginLeft: '20px' }}>
          {children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onToggle={onToggle}
              onContextMenu={onContextMenu}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {isFolder && (
        <div style={{ marginLeft: '40px' }}>
          <button onClick={handleCreateFile}>Create File</button>
          <button onClick={handleCreateFolder}>Create Folder</button>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {isFile && (
        <div style={{ marginLeft: '20px' }}>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

const TreeExample = () => {
  const [data] = useState({
    id: 1,
    name: 'root',
    toggled: true,
    type: 'folder',
    children: [
      {
        id: 2,
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 3,
            name: 'components',
            type: 'folder',
            children: [
              { id: 4, name: 'codeEditor.jsx', type: 'file' },
              { id: 5, name: 'TableBlock.jsx', type: 'file' },
            ],
          },
          {
            id: 6,
            name: 'styles',
            type: 'folder',
            children: [
              { id: 7, name: 'main.css', type: 'file' },
              { id: 8, name: 'style.css', type: 'file' },
            ],
          },
        ],
      },
      { id: 9, name: 'app.js', type: 'file' },
      { id: 10, name: 'index.js', type: 'file' },
      { id: 11, name: '.gitignore', type: 'file' },
      { id: 12, name: '.package-lock.json', type: 'file' },
      { id: 13, name: '.package.json', type: 'file' },
      { id: 14, name: 'README.md', type: 'file' },
    ],
  });

  const onToggle = (clickedNode, toggled, isFolder) => {
    if (isFolder) {
      console.log(`${clickedNode.name} ${toggled ? 'opened' : 'closed'}`);
    } else {
      console.log(`Clicked on file: ${clickedNode.name}`);
    }
  };

  const onContextMenu = (clickedNode) => {
    console.log(`Context menu opened for: ${clickedNode.name}`);
  };

  const onCreateFile = (parentNode) => {
    const newFileId = generateId();
    const defaultFileName = `newFile${newFileId}.txt`;
    const userInput = window.prompt(`Enter file name (default: ${defaultFileName}):`, defaultFileName);
    if (userInput === null) {
      return;
    }
    const newFile = { id: newFileId, name: userInput.trim() || defaultFileName, type: 'file' };
    console.log({
      type: parentNode.type,
      parentName: parentNode.name,
      parentId: parentNode.id,
      name: newFile.name,
    });
  };
  

  const onCreateFolder = (parentNode) => {
    const newFolderId = generateId();
    const newFolder = { id: newFolderId, name: `New Folder${newFolderId}`, type: 'folder', children: [] };
    console.log({
      type: parentNode.type,
      parentName: parentNode.name,
      parentId: parentNode.id,
      name: newFolder.name,
    });
  };

  const onUpdate = (selectedNode) => {
    console.log(`Updated ${selectedNode.name} (ID: ${selectedNode.id})`);
  };

  const onDelete = (selectedNode) => {
    console.log(`Deleted ${selectedNode.name} (ID: ${selectedNode.id})`);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10000);
  };

  return (
    <div>
      <TreeNode
        node={data}
        onToggle={onToggle}
        onContextMenu={onContextMenu}
        onCreateFile={onCreateFile}
        onCreateFolder={onCreateFolder}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TreeExample;
