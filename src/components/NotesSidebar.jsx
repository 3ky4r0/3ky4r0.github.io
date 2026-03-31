import React from 'react';

const NotesSidebar = ({ notesWidth, startResizing, notes, setNotes }) => {
  return (
    <aside
      className="sidebar-right"
      style={{ width: window.innerWidth > 768 ? `${notesWidth}px` : '100%' }}
    >
      <div className="sidebar-resizer resizer-left" onMouseDown={startResizing('notes')} />
      <div className="notes-header">
        NOTES
      </div>
      <textarea
        className="notes-area"
        placeholder="Write notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </aside>
  );
};

export default NotesSidebar;
