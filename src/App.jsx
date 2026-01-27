import { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';
import PdfViewer from './PdfViewer';

// --- CONFIG & UTILS ---
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
  const [currentSource, setCurrentSource] = useState('foss');
  const [markdownContent, setMarkdownContent] = useState('Đang nạp dữ liệu...');
  const [displayType, setDisplayType] = useState('markdown'); // 'markdown', 'image', 'pdf'
  const [currentImage, setCurrentImage] = useState({ src: '', label: '' });
  const [currentPdf, setCurrentPdf] = useState({ src: '', label: '' });
  const [totpCodes, setTotpCodes] = useState({ key1: '------', key2: '------', key3: '------' });
  const [token, setToken] = useState(localStorage.getItem('github_token') || '');
  const [expandedFolders, setExpandedFolders] = useState({
    resources: false,
    ute: false,
    bank: false
  });
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  // Load Markdown
  useEffect(() => {
    if (displayType !== 'markdown') return;
    async function load() {
      const cacheKey = `cache_${currentSource}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) setMarkdownContent(marked.parse(cached));

      try {
        const res = await fetch(MARKDOWN_SOURCES[currentSource]);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text();
        localStorage.setItem(cacheKey, text);
        setMarkdownContent(marked.parse(text));
      } catch (e) {
        console.error("Fetch error:", e);
        if (!cached) setMarkdownContent(`❌ Lỗi tải dữ liệu: ${e.message}`);
      }
    }
    load();
  }, [currentSource, displayType]);

  // Post-process Markdown: Click-to-copy code blocks
  useEffect(() => {
    if (displayType !== 'markdown') return;

    const setupClickToCopy = () => {
      const preElements = document.querySelectorAll('.markdown-body pre');
      preElements.forEach(pre => {
        if (pre.dataset.hasClickToCopy) return;
        pre.dataset.hasClickToCopy = 'true';

        pre.onclick = (e) => {
          e.stopPropagation();
          const codeEl = pre.querySelector('code');
          const text = codeEl ? codeEl.innerText : pre.innerText;

          navigator.clipboard.writeText(text);
        };
      });
    };

    const observer = new MutationObserver(setupClickToCopy);
    const contentArea = document.querySelector('.markdown-body');
    if (contentArea) {
      observer.observe(contentArea, { childList: true, subtree: true });
    }

    setupClickToCopy();
    const timer = setTimeout(setupClickToCopy, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [markdownContent, displayType]);

  // Update TOTP using Web Worker
  useEffect(() => {
    const worker = new Worker(new URL('./totpWorker.js', import.meta.url));

    worker.onmessage = (e) => {
      setTotpCodes(e.data.codes);
    };

    const update = () => {
      worker.postMessage({ keys: KEYS });
    };

    update();
    const interval = setInterval(update, 1000);

    return () => {
      clearInterval(interval);
      worker.terminate();
    };
  }, []);


  // Preload Assets & Hide Preloader
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
      }, 800);
    }

    Object.values(MARKDOWN_SOURCES).forEach(url => {
      fetch(url).then(res => res.text()).then(text => {
        const key = `cache_${url.split('/').pop().replace('.md', '')}`;
        localStorage.setItem(key, text);
      });
    });

    ['bank/agribank.webp', 'bank/vietcombank.webp', 'bank/momo.webp', 'assets/avatar.webp', 'ute/chuongtrinhdaotao.pdf', 'ute/sotaysinhvien.pdf'].forEach(src => {
      fetch(src, { mode: 'no-cors' }).catch(() => { });
    });
  }, []);

  const openMarkdown = (id) => {
    setCurrentSource(id);
    setDisplayType('markdown');
  };

  const openImage = (src, label) => {
    if (window.innerWidth <= 768) {
      setPhotoUrl(src);
      setIsPhotoVisible(true);
      return;
    }
    setCurrentImage({ src, label });
    setDisplayType('image');
  };

  const openPdf = (src, label) => {
    if (window.innerWidth <= 768) {
      window.open(src, '_blank');
      return;
    }
    setCurrentPdf({ src, label });
    setDisplayType('pdf');
  };

  return (
    <div className="app-container">
      <div className="background-layer">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="assets/main.webm" type="video/webm" />
        </video>
        <div className="background-overlay"></div>
      </div>

      <div className="main-wrapper">
        <aside className="sidebar-left">
          <div className="tree-container">

            {/* Folder: Docs - HIDE ON MOBILE */}
            <div className="tree-folder hide-mobile">
              <div className="tree-folder-title" onClick={() => toggleFolder('resources')}>
                <svg className={`chevron ${expandedFolders.resources ? 'expanded' : ''}`} viewBox="0 0 16 16"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path></svg>
                <span>Docs</span>
              </div>
              {expandedFolders.resources && (
                <div className="tree-children">
                  <div className={`tree-item ${displayType === 'markdown' && currentSource === 'foss' ? 'active' : ''}`} onClick={() => openMarkdown('foss')}>
                    <span>page 1</span>
                    {displayType === 'markdown' && currentSource === 'foss' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                  <div className={`tree-item ${displayType === 'markdown' && currentSource === 'v' ? 'active' : ''}`} onClick={() => openMarkdown('v')}>
                    <span>page 2</span>
                    {displayType === 'markdown' && currentSource === 'v' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                </div>
              )}
            </div>

            {/* Folder: UTE */}
            <div className="tree-folder">
              <div className="tree-folder-title" onClick={() => toggleFolder('ute')}>
                <svg className={`chevron ${expandedFolders.ute ? 'expanded' : ''}`} viewBox="0 0 16 16"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path></svg>
                <span>UTE</span>
              </div>
              {expandedFolders.ute && (
                <div className="tree-children">
                  <div className={`tree-item ${displayType === 'pdf' && currentPdf.label === 'CTDT' ? 'active' : ''}`} onClick={() => openPdf('ute/chuongtrinhdaotao.pdf', 'CTDT')}>
                    <span>CTDT</span>
                    {displayType === 'pdf' && currentPdf.label === 'CTDT' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                  <div className={`tree-item ${displayType === 'pdf' && currentPdf.label === 'STSV' ? 'active' : ''}`} onClick={() => openPdf('ute/sotaysinhvien.pdf', 'STSV')}>
                    <span>STSV</span>
                    {displayType === 'pdf' && currentPdf.label === 'STSV' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                </div>
              )}
            </div>

            {/* Folder: BANK */}
            <div className="tree-folder">
              <div className="tree-folder-title" onClick={() => toggleFolder('bank')}>
                <svg className={`chevron ${expandedFolders.bank ? 'expanded' : ''}`} viewBox="0 0 16 16"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path></svg>
                <span>BANK</span>
              </div>
              {expandedFolders.bank && (
                <div className="tree-children">
                  <div className={`tree-item ${displayType === 'image' && currentImage.label === 'Agribank' ? 'active' : ''}`} onClick={() => openImage('bank/agribank.webp', 'Agribank')}>
                    <span>Agribank</span>
                    {displayType === 'image' && currentImage.label === 'Agribank' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                  <div className={`tree-item ${displayType === 'image' && currentImage.label === 'Vietcombank' ? 'active' : ''}`} onClick={() => openImage('bank/vietcombank.webp', 'Vietcombank')}>
                    <span>Vietcombank</span>
                    {displayType === 'image' && currentImage.label === 'Vietcombank' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                  <div className={`tree-item ${displayType === 'image' && currentImage.label === 'Momo' ? 'active' : ''}`} onClick={() => openImage('bank/momo.webp', 'Momo')}>
                    <span>Momo</span>
                    {displayType === 'image' && currentImage.label === 'Momo' && <img src="/assets/check.svg" className="active-check" alt="checked" />}
                  </div>
                </div>
              )}
            </div>

          </div>
        </aside>

        <main className="content-area">
          {displayType === 'markdown' ? (
            <article className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownContent }} />
          ) : displayType === 'pdf' ? (
            <PdfViewer file={currentPdf.src} />
          ) : (
            <div className="image-view">
              <img src={currentImage.src} alt={currentImage.label} className="centered-img" />
            </div>
          )}
        </main>

        <aside className="sidebar-right">
          <div className="profile-section hide-mobile">
            <img src="assets/avatar.webp" alt="Avatar" className="avatar" />
          </div>

          <div className="widget hide-mobile">
            <h3 className="widget-title">Authenticator</h3>
            <div className="totp-box">
              <div className="totp-item" onClick={() => navigator.clipboard.writeText(totpCodes.key1)}>
                <span className="totp-code red">{totpCodes.key1}</span>
              </div>
              <div className="totp-item" onClick={() => navigator.clipboard.writeText(totpCodes.key2)}>
                <span className="totp-code blue">{totpCodes.key2}</span>
              </div>
              <div className="totp-item" onClick={() => navigator.clipboard.writeText(totpCodes.key3)}>
                <span className="totp-code">{totpCodes.key3}</span>
              </div>
            </div>
          </div>

        </aside>
      </div>


      {/* CUSTOM MOBILE PHOTO VIEWER WITH SWIPE TO CLOSE */}
      {isPhotoVisible && (
        <div
          className="mobile-photo-overlay"
          onClick={() => setIsPhotoVisible(false)}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            window._startY = touch.clientY;
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const deltaY = touch.clientY - window._startY;
            if (deltaY > 0) {
              const el = e.currentTarget.querySelector('.mobile-photo-content');
              if (el) {
                el.style.transform = `translateY(${deltaY}px)`;
                e.currentTarget.style.opacity = Math.max(0, 1 - deltaY / 400);
              }
            }
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            const deltaY = touch.clientY - window._startY;
            if (deltaY > 100) {
              setIsPhotoVisible(false);
            } else {
              const el = e.currentTarget.querySelector('.mobile-photo-content');
              if (el) {
                el.style.transform = '';
                e.currentTarget.style.opacity = '';
              }
            }
          }}
        >
          <div
            className="mobile-photo-content"
            style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }}
            onClick={(e) => e.stopPropagation()} // Stop click from bubbling to the overlay
          >
            <img src={photoUrl} alt="View" className="mobile-view-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
