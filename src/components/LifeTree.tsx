import { useState, useEffect } from 'react';
import './LifeTree.css';
import { TreeNodeData, TreeNodeProps } from '../types';

const initialLifeData: TreeNodeData = {
  Health: {
    Diet: { isCustom: false },
    Exercise: { isCustom: false },
    Sleep: { isCustom: false }
  },
  Wealth: {
    Career: { isCustom: false },
    Investing: { isCustom: false },
    Budgeting: { isCustom: false }
  },
  Relationships: {
    Partner: { isCustom: false },
    Family: { isCustom: false },
    Friends: { isCustom: false }
  }
};

const STORAGE_KEY = 'lifeTreeData';

const TreeNode: React.FC<TreeNodeProps> = ({ 
  label, 
  children, 
  level = 0, 
  onAddChild, 
  onDeleteChild, 
  isSubcategory = false,
  parentCategory = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  
  // Filter out the isCustom flag when checking for children
  const actualChildren = Object.entries(children)
    .filter(([key]) => key !== 'isCustom')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as TreeNodeData);
  
  const hasChildren = Object.keys(actualChildren).length > 0;
  const isCustom = (children as any).isCustom;

  // Determine the category for color inheritance
  const category = parentCategory || label;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChildName.trim()) {
      onAddChild(label, newChildName.trim());
      setNewChildName('');
      setIsAdding(false);
      setIsOpen(true);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(false);
    setNewChildName('');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteChild(label);
  };

  return (
    <div 
      className={`tree-node ${hasChildren ? 'has-children' : ''}`}
      data-category={category}
    >
      <div 
        className={`tree-label ${hasChildren ? 'has-children' : ''}`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="toggle-icon">{isOpen ? '▼' : '▶'}</span>
        )}
        {label}
        <div className="node-buttons">
          <button className="add-button" onClick={handleAddClick}>+</button>
          {isSubcategory && isCustom && (
            <button className="delete-button" onClick={handleDelete}>×</button>
          )}
        </div>
      </div>
      {isAdding && (
        <form className="add-form" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
          <input
            type="text"
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            placeholder="New subcategory"
            autoFocus
          />
          <div className="form-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
      {isOpen && hasChildren && (
        <div className="tree-children">
          {Object.entries(actualChildren).map(([childLabel, childData]) => (
            <TreeNode
              key={childLabel}
              label={childLabel}
              children={childData as TreeNodeData}
              level={level + 1}
              onAddChild={onAddChild}
              onDeleteChild={onDeleteChild}
              isSubcategory={true}
              parentCategory={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const LifeTree: React.FC = () => {
  const [data, setData] = useState<TreeNodeData>(() => {
    // Load data from localStorage on initial render
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialLifeData;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleAddChild = (parentLabel: string, newChildName: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      
      // Helper function to recursively find and update the parent
      const updateNode = (node: TreeNodeData, targetLabel: string, newChild: string): boolean => {
        if (node[targetLabel] !== undefined) {
          const parentNode = node[targetLabel];
          node[targetLabel] = {
            ...parentNode,
            [newChild]: { isCustom: true }
          };
          return true;
        }
        
        for (const key in node) {
          if (typeof node[key] === 'object' && key !== 'isCustom') {
            if (updateNode(node[key] as TreeNodeData, targetLabel, newChild)) {
              return true;
            }
          }
        }
        return false;
      };

      updateNode(newData, parentLabel, newChildName);
      return newData;
    });
  };

  const handleDeleteChild = (childLabel: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      
      // Helper function to recursively find and delete the child
      const deleteNode = (node: TreeNodeData, targetLabel: string): boolean => {
        const targetNode = node[targetLabel];
        if (targetNode && targetNode.isCustom) {
          delete node[targetLabel];
          return true;
        }
        
        for (const key in node) {
          if (typeof node[key] === 'object' && key !== 'isCustom') {
            if (deleteNode(node[key] as TreeNodeData, targetLabel)) {
              return true;
            }
          }
        }
        return false;
      };

      deleteNode(newData, childLabel);
      return newData;
    });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to the initial structure? This will delete all custom subcategories.')) {
      setData(initialLifeData);
    }
  };

  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  return (
    <div className="life-tree">
      <h1>SIGMA</h1>
      <div className="tree-container">
        {Object.entries(data).map(([category, subcategories]) => (
          <TreeNode
            key={category}
            label={category}
            children={subcategories as TreeNodeData}
            onAddChild={handleAddChild}
            onDeleteChild={handleDeleteChild}
          />
        ))}
      </div>
      <div className="footer">
        <div className="instructions-section">
          <div 
            className={`instructions-header ${isInstructionsOpen ? 'open' : ''}`}
            onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
          >
            <span className="toggle-icon">{isInstructionsOpen ? '▼' : '▶'}</span>
            Instructions
          </div>
          {isInstructionsOpen && (
            <div className="instructions-content">
              <p>Welcome to your Life Tree! Here's how to use it:</p>
              <ul>
                <li>Click on any category to expand/collapse its subcategories</li>
                <li>Use the + button to add custom subcategories</li>
                <li>Use the × button to remove custom subcategories</li>
                <li>Use the Reset Structure button to restore the default categories</li>
              </ul>
            </div>
          )}
        </div>
        <div className="footer-buttons">
          <button className="reset-button" onClick={handleReset}>
            Reset Structure
          </button>
          <span className="version">v0.0.1</span>
        </div>
      </div>
    </div>
  );
};

export default LifeTree; 