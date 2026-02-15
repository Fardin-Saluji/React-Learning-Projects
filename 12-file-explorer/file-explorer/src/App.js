import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess, MdDeleteOutline } from 'react-icons/md';
import { FiFolderPlus } from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';

const initialTree = [
  {
    id: '1',
    name: 'public',
    type: 'folder',
    children: [{ id: '2', name: 'index.html', type: 'file' }]
  }, 
  {
    id: '3',
    name: 'src',
    type: 'folder',
    children: [
      { id: '4', name: 'App.js', type: 'file' },
      { id: '5', name: 'index.js', type: 'file' }
    ]
  },
  { id: '6', name: 'package.json', type: 'file' }
];

const generateId = () => 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

const App = () => {
  const [tree, setTree] = useState(initialTree);
  const [expanded, setExpanded] = useState({}); 
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('file'); 
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [inputValue, setInputValue] = useState('');

 
  const toggleExpand = (nodeId) => {
    setExpanded(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const deleteNode = (nodes, id) => {
    return nodes.reduce((acc, node) => {
      if (node.id === id) return acc; 
      if (node.type === 'folder' && node.children) {
        acc.push({ ...node, children: deleteNode(node.children, id) });
      } else {
        acc.push(node);
      }
      return acc;
    }, []);
  };
  
  const handleDelete = (id) => {
    setTree(prevTree => deleteNode(prevTree, id));
  };


  const addNodeToFolder = (nodes, folderId, newNode) => {
    return nodes.map(node => {
      if (node.id === folderId && node.type === 'folder') {
        return { ...node, children: [...(node.children || []), newNode] };
      }
      if (node.type === 'folder' && node.children) {
        return { ...node, children: addNodeToFolder(node.children, folderId, newNode) };
      }
      return node;
    });
  };
  
  const handleAddSubmit = () => {
    if (!inputValue.trim()) return;
    const newNode = {
      id: generateId(),
      name: inputValue,
      type: modalType,
      ...(modalType === 'folder' && { children: [] })
    };
    setTree(prevTree => addNodeToFolder(prevTree, currentFolderId, newNode));
  
    setExpanded(prev => ({ ...prev, [currentFolderId]: true }));
    setShowModal(false);
    setInputValue('');
  };
  
  const handleCancel = () => {
    setShowModal(false);
    setInputValue('');
  };


  const FileExplorerItem = ({ node }) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expanded[node.id];

    return (
      <div style={{ marginLeft: '20px', marginTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Expand/collapse icon for folders */}
          {isFolder && (
            <span onClick={() => toggleExpand(node.id)} style={{ cursor: 'pointer' }}>
              {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </span>
          )}
          {/* Name */}
          <span>{node.name}</span>

          {/* Action icons only for folders */}
          {isFolder && (
            <>
              <FiFolderPlus
                data-testid={`add-folder-${node.id}`}
                onClick={() => {
                  setModalType('folder');
                  setCurrentFolderId(node.id);
                  setShowModal(true);
                }}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              />
              <AiOutlineFileAdd
                data-testid={`add-file-${node.id}`}
                onClick={() => {
                  setModalType('file');
                  setCurrentFolderId(node.id);
                  setShowModal(true);
                }}
                style={{ cursor: 'pointer' }}
              />
            </>
          )}

          {/* Delete icon for all nodes */}
          <MdDeleteOutline
            data-testid="delete"
            onClick={() => handleDelete(node.id)}
            style={{ cursor: 'pointer', color: 'red' }}
          />
        </div>

        {/* Render children if folder and expanded */}
        {isFolder && isExpanded && node.children && (
          <div>
            {node.children.map(child => (
              <FileExplorerItem key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>File Explorer</h1>
      {tree.map(node => (
        <FileExplorerItem key={node.id} node={node} />
      ))}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <h3>Enter {modalType} name</h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Name"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button data-testid="add" onClick={handleAddSubmit}>Add</button>
              <button data-testid="cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
