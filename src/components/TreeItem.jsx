import React from 'react';

/**
 * A reusable sidebar item with magic-move highlight.
 * Following vercel-react-best-practices (rerender-memo)
 */
const TreeItem = React.memo(({ active, onClick, children, className = "" }) => (
  <div
    className={`tree-item ${active ? 'active' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
));

export default TreeItem;
