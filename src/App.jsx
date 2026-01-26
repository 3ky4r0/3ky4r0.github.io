import { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';

// --- CONFIG & UTILS ---
const MARKDOWN_SOURCES = {
  foss: 'Markdown/foss.md',
  v: 'Markdown/v.md'
};

const KEYS = {
  key1: "414d4c355844465a474350375a524d5958375a574743504d5536475a4e47424f5251553736594f32533749484e5354563659585345334f5348454b5454494149",
  key2: "564b544d4e4e494e34584c48335a4f4c4f4d495352555449344e5947554434554b3246593442355a4341564f544b415550574f37354f4449454d4b3441564441",
  key3: "XBKB4AEAX4JUZHTB56JJK3J3GA"
};

function App() {
  const [currentSource, setCurrentSource] = useState('foss');
  const [markdownContent, setMarkdownContent] = useState('Đang nạp dữ liệu...');
  const [displayType, setDisplayType] = useState('markdown'); // 'markdown' or 'image'
  const [currentImage, setCurrentImage] = useState({ src: '', label: '' });
  const [totpCodes, setTotpCodes] = useState({ key1: '------', key2: '------', key3: '------' });
  const [githubLimit, setGithubLimit] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('github_token') || '');
  const [expandedFolders, setExpandedFolders] = useState({
    resources: true,
    ute: true,
    bank: true
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          navigator.clipboard.writeText(text).then(() => {
            pre.classList.add('code-copied');
            setTimeout(() => {
              pre.classList.remove('code-copied');
            }, 1500);
          });
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

  // Check GitHub Limit
  const checkGitHub = async () => {
    if (!token) return;
    try {
      const res = await fetch('https://api.github.com/rate_limit', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      localStorage.setItem('github_token', token);
      setGithubLimit(data.resources);
    } catch (e) { alert('Token lỗi!'); }
  };

  useEffect(() => {
    if (token) checkGitHub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMarkdown = (id) => {
    setCurrentSource(id);
    setDisplayType('markdown');
  };

  const openImage = (src, label) => {
    setCurrentImage({ src, label });
    setDisplayType('image');
    if (window.innerWidth <= 768) {
      setIsModalOpen(true);
    }
  };

  const openFile = (path) => {
    window.open(path, '_blank');
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

            {/* Folder: Resources - HIDE ON MOBILE */}
            <div className="tree-folder hide-mobile">
              <div className="tree-folder-title" onClick={() => toggleFolder('resources')}>
                <svg className={`chevron ${expandedFolders.resources ? 'expanded' : ''}`} viewBox="0 0 16 16"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path></svg>
                <span>Nội dung</span>
              </div>
              {expandedFolders.resources && (
                <div className="tree-children">
                  <div className={`tree-item ${displayType === 'markdown' && currentSource === 'foss' ? 'active' : ''}`} onClick={() => openMarkdown('foss')}>
                    foss-apps.md
                  </div>
                  <div className={`tree-item ${displayType === 'markdown' && currentSource === 'v' ? 'active' : ''}`} onClick={() => openMarkdown('v')}>
                    v.md
                  </div>
                </div>
              )}
            </div>

            {/* Folder: UTE */}
            <div className="tree-folder">
              <div className="tree-folder-title" onClick={() => toggleFolder('ute')}>
                <svg className={`chevron ${expandedFolders.ute ? 'expanded' : ''}`} viewBox="0 0 16 16"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path></svg>
                <span>Trường học (UTE)</span>
              </div>
              {expandedFolders.ute && (
                <div className="tree-children">
                  <div className="tree-item" onClick={() => openFile('ute/chuongtrinhdaotao.pdf')}>
                    chuong-trinh-dt.pdf
                  </div>
                  <div className="tree-item" onClick={() => openFile('ute/sotaysinhvien.pdf')}>
                    so-tay-sv.pdf
                  </div>
                </div>
              )}
            </div>

            {/* Folder: Bank */}
            <div className="tree-folder">
              <div className="tree-folder-title" onClick={() => toggleFolder('bank')}>
                <svg className={`chevron ${expandedFolders.bank ? 'expanded' : ''}`} viewBox="0 0 16 16"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path></svg>
                <span>Ngân hàng</span>
              </div>
              {expandedFolders.bank && (
                <div className="tree-children">
                  <div className={`tree-item ${displayType === 'image' && currentImage.label === 'Agribank' ? 'active' : ''}`} onClick={() => openImage('bank/agribank.webp', 'Agribank')}>
                    agribank.png
                  </div>
                  <div className={`tree-item ${displayType === 'image' && currentImage.label === 'Vietcombank' ? 'active' : ''}`} onClick={() => openImage('bank/vietcombank.webp', 'Vietcombank')}>
                    vietcombank.png
                  </div>
                  <div className={`tree-item ${displayType === 'image' && currentImage.label === 'Ví Momo' ? 'active' : ''}`} onClick={() => openImage('bank/momo.webp', 'Ví Momo')}>
                    momo.png
                  </div>
                </div>
              )}
            </div>

          </div>
        </aside>

        <main className="content-area">
          <nav className="breadcrumb">
            <span className="crumb">duyxyz</span>
            <span className="sep">/</span>
            <span className="crumb current">
              {displayType === 'markdown' ? (currentSource === 'foss' ? 'Foss Apps' : 'V') : currentImage.label}
            </span>
          </nav>

          {displayType === 'markdown' ? (
            <article className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownContent }} />
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

          <div className="widget">
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

          <div className="widget hide-mobile">
            <h3 className="widget-title">GitHub API Status</h3>
            <div className="gh-card">
              <input
                type="password"
                className="gh-input"
                placeholder="GitHub Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <button className="gh-button" onClick={checkGitHub}>Check Limit</button>

              {githubLimit && (
                <div className="gh-progress-group">
                  <div className="gh-progress-label">
                    <span>Core</span>
                    <span>{githubLimit.core.remaining} / {githubLimit.core.limit}</span>
                  </div>
                  <div className="gh-progress-bar">
                    <div
                      className="gh-progress-fill core"
                      style={{ width: `${(githubLimit.core.remaining / githubLimit.core.limit) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* POPUP MODAL FOR MOBILE IMAGES */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>{currentImage.label}</span>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <img src={currentImage.src} alt={currentImage.label} className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
