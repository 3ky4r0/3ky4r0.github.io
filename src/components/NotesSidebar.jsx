import React from 'react';

const NotesSidebar = ({ notesWidth, startResizing, notes, setNotes, totpCodes }) => {
  return (
    <aside
      className="sidebar-right"
      style={{ width: window.innerWidth > 768 ? `${notesWidth}px` : '100%' }}
    >
      <div className="sidebar-resizer resizer-left" onMouseDown={startResizing('notes')} />
      <div className="notes-header">
        Notes
      </div>
      <textarea
        className="notes-area"
        placeholder="Viết ghi chú tại đây..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="notes-sentinel-footer">
        <div className="notes-header">
          Sentinel
        </div>
        <div className="notes-otp-row">
          {totpCodes && [
            { code: totpCodes.key1, color: 'red' },
            { code: totpCodes.key2, color: 'blue' },
            { code: totpCodes.key3, color: 'neutral' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="notes-otp-item" 
              onClick={() => item.code && navigator.clipboard.writeText(item.code)}
            >
              <div className={`otp-container compact ${item.color}`}>
                {item.code && item.code.split('').map((char, i) => (
                  <span key={i} className="otp-digit">{char}</span>
                ))}
              </div>
              <div className="ripple-wrapper"><md-ripple></md-ripple></div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default NotesSidebar;
