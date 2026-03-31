import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

// Logic Layer (Hooks)
import { useTheme } from './hooks/useTheme';
import { useTotp } from './hooks/useTotp';
import { useMarkdown } from './hooks/useMarkdown';

// Utility Layer
import { parseCustomMarkdown } from './utils/markdown';

// Component Layer
import SidebarRail from './components/SidebarRail';
import SidebarMain from './components/SidebarMain';
import MainContent from './components/MainContent';
import NotesSidebar from './components/NotesSidebar';

// --- CONFIG ---
const MARKDOWN_SOURCES = {
  foss: 'Markdown/page1.md',
  v: 'Markdown/page2.md'
};

const KEYS = {
  key1: "414d4c355844465a474350375a524d5958375a574743504d5536475a4e47424f5251553736594f32533749484e5354563659585345334f5348454b5454494149",
  key2: "564b544d4e4e494e34584c48335a4f4c4f4d495352555449344e5947554434554b3246593442355a4341564f544b415550574f37354f4449454d4b3441564441",
  key3: "XBKB4AEAX4JUZHTB56JJK3J3GA"
};

const BANK_IMAGES = [
  { src: 'bank/agribank.webp', label: 'Agribank' },
  { src: 'bank/vietcombank.webp', label: 'Vietcombank' },
  { src: 'bank/momo.webp', label: 'Momo' }
];

function App() {
  // Logic Layer Integration
  const { theme, setTheme, activeTheme } = useTheme();
  const [currentSource, setCurrentSource] = useState('foss');
  const [displayType, setDisplayType] = useState('markdown');
  const markdownRaw = useMarkdown(currentSource, MARKDOWN_SOURCES);
  const totpCodes = useTotp(KEYS);

  // Remaining Local Logic (UI State)
  const [currentImage, setCurrentImage] = useState({ src: '', label: '' });
  const [currentPdf, setCurrentPdf] = useState({ src: '', label: '' });
  const [expandedFolders, setExpandedFolders] = useState({
    resources: true,
    ute: true,
    bank: true,
    authenticator: true
  });
  const [notes, setNotes] = useState(() => localStorage.getItem('op2fa_notes') || '');
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Layout Dimensions
  const [fileWidth, setFileWidth] = useState(() => parseInt(localStorage.getItem('file_width')) || 260);
  const [notesWidth, setNotesWidth] = useState(() => parseInt(localStorage.getItem('notes_width')) || 400);
  const [resizingSidebar, setResizingSidebar] = useState(null);

  useEffect(() => { localStorage.setItem('op2fa_notes', notes); }, [notes]);

  // Derived State
  const renderedMarkdown = useMemo(() => parseCustomMarkdown(markdownRaw), [markdownRaw]);

  // Handlers
  const toggleSettings = useCallback(() => setIsSettingsOpen(prev => !prev), []);
  const toggleFolder = useCallback((folder) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  }, []);

  const openImage = useCallback((src, label) => {
    setCurrentImage({ src, label });
    setDisplayType('image');
  }, []);

  const startResizing = useCallback((sidebar) => (e) => {
    e.preventDefault();
    setResizingSidebar(sidebar);
  }, []);

  // Global Event Listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizingSidebar) return;
      if (resizingSidebar === 'file') {
        const newWidth = e.clientX - 54; // Account for Sidebar Rail
        if (newWidth > 260 && newWidth < 500) {
          setFileWidth(newWidth);
          localStorage.setItem('file_width', newWidth);
        }
      } else if (resizingSidebar === 'notes') {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 200 && newWidth < 800) {
          setNotesWidth(newWidth);
          localStorage.setItem('notes_width', newWidth);
        }
      }
    };
    const handleMouseUp = () => setResizingSidebar(null);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingSidebar]);

  // The application now loads immediately without the artificial wait.


  return (
    <div className={`app-container theme-${activeTheme} theme-sel-${theme}`}>
      <div className="background-layer">
        <div className="background-overlay"></div>
      </div>

      <div className="main-wrapper">
        <SidebarRail 
          isSettingsOpen={isSettingsOpen}
          toggleSettings={toggleSettings}
          theme={theme}
          setTheme={setTheme}
          setIsSettingsOpen={setIsSettingsOpen}
          displayType={displayType}
          setDisplayType={setDisplayType}
          setCurrentSource={setCurrentSource}
        />

        {displayType !== 'video' && (
          <SidebarMain 
            fileWidth={fileWidth}
            startResizing={startResizing}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            displayType={displayType}
            currentSource={currentSource}
            setCurrentSource={setCurrentSource}
            setDisplayType={setDisplayType}
            currentImage={currentImage}
            openImage={openImage}
            totpCodes={totpCodes}
            BANK_IMAGES={BANK_IMAGES}
          />
        )}

        <MainContent 
          displayType={displayType}
          renderedMarkdown={renderedMarkdown}
          currentPdf={currentPdf}
          currentImage={currentImage}
        />

        {displayType !== 'video' && (
          <NotesSidebar 
            notesWidth={notesWidth}
            startResizing={startResizing}
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>

      {/* Photo Overlay (Mobile/Center) */}
      {isPhotoVisible && (
        <div className="mobile-photo-overlay" onClick={() => setIsPhotoVisible(false)}>
          <div className="mobile-photo-content" onClick={e => e.stopPropagation()}>
            <img src={photoUrl} alt="View" className="mobile-view-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
