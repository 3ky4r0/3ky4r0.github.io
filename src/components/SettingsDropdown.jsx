import React from 'react';

/**
 * Settings Dropdown - Clean & Neutral
 */
const SettingsDropdown = ({ isOpen, theme, setTheme, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Static Backdrop */}
      <div
        className="dropdown-backdrop"
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998,
          background: 'transparent'
        }}
      />

      <div
        className="settings-dropdown"
        onClick={handleContentClick}
        style={{
          position: 'absolute',
          bottom: '35px',
          left: '60px',
          zIndex: 999
        }}
      >
        <div className="dropdown-header">Chế độ hiển thị</div>
        <div className="dropdown-options">
          {[
            { id: 'system', label: 'Hệ thống' },
            { id: 'light', label: 'Sáng' },
            { id: 'dark', label: 'Tối' }
          ].map((opt) => (
            <button
              key={opt.id}
              className={`dropdown-item ${theme === opt.id ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setTheme(opt.id);
                onClose();
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SettingsDropdown;
