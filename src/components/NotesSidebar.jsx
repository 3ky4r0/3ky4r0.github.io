import React from 'react';

const NotesSidebar = ({ notesWidth, startResizing, notes, setNotes }) => {
  return (
    <aside
      className="sidebar-right"
      style={{ width: window.innerWidth > 768 ? `${notesWidth}px` : '100%' }}
    >
      <div className="sidebar-resizer resizer-left" onMouseDown={startResizing('notes')} />
      <div className="notes-header">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        Notes
      </div>
      <textarea
        className="notes-area"
        placeholder="Viết ghi chú tại đây..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </aside>
  );
};

export default NotesSidebar;
