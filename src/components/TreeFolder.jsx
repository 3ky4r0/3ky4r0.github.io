import React from 'react';

/**
 * A collapsible folder in the sidebar tree.
 * Following vercel-react-best-practices (rendering-conditional-render)
 */
const TreeFolder = ({ title, expanded, onToggle, children, className = "" }) => {
  return (
    <div className={`tree-folder ${className}`}>
      <div className="tree-folder-title" onClick={onToggle}>
        <span>{title}</span>
        <svg 
          className={`chevron ${expanded ? 'expanded' : ''}`} 
          viewBox="0 0 16 16"
        >
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </div>
      {expanded ? (
        <div className="tree-children">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default TreeFolder;
