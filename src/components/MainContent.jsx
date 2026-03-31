import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PdfViewer from '../PdfViewer';

const MainContent = ({ currentSource, displayType, renderedMarkdown, currentPdf, currentImage, onPdfLoadFinish, totpCodes }) => {
  const [fps, setFps] = React.useState(0);
  const [ms, setMs] = React.useState(0);

  React.useEffect(() => {
    if (displayType !== 'visualizer') return;
    
    let frameId;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      frameCount++;

      if (now - lastFpsUpdate > 500) { 
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        setMs(delta.toFixed(2));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [displayType]);

  return (
    <main className={`content-area ${displayType === 'video' ? 'video-mode' : ''}`}>
      {(displayType !== 'video' && displayType !== 'visualizer' && displayType !== 'otp') && (
        <header className="content-header">
          {displayType === 'markdown' && 'DOCUMENT VIEWER'}
          {displayType === 'pdf' && 'SENTINEL SECURE PDF'}
          {displayType === 'image' && 'SECURE IMAGE ASSET'}
        </header>
      )}

      {displayType === 'markdown' ? (
        <article 
          key={currentSource}
          className={`markdown-body ${currentSource === 'v' ? 'logbook-mode' : ''}`}
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              pre: ({ children, ...props }) => (
                <pre 
                  {...props} 
                  className="copyable-code-block"
                  onClick={(e) => {
                    const code = e.currentTarget.querySelector('code')?.innerText || '';
                    navigator.clipboard.writeText(code);
                  }}
                >
                  {children}
                </pre>
              )
            }}
          >
            {renderedMarkdown}
          </ReactMarkdown>
        </article>
      ) : displayType === 'pdf' ? (
        <PdfViewer file={currentPdf.src} onLoadFinish={onPdfLoadFinish} />
      ) : displayType === 'image' ? (
        <div className="image-viewer-centered">
          <img 
            src={currentImage.src} 
            alt={currentImage.label} 
            className="centered-img" 
          />
        </div>
      ) : displayType === 'video' ? (
        <div className="video-viewer-full">
          <video src="/video.mp4" controls autoPlay loop className="full-video" />
        </div>
      ) : displayType === 'visualizer' ? (
        <div className="visualizer-container fps-mode">
          <div className="visualizer-header">WORKSTATION PERFORMANCE SYNC</div>
          
          <div className="fps-dashboard">
            <div className="fps-main">
              <span className="fps-value">{fps}</span>
              <span className="fps-label">FPS</span>
            </div>
            
            <div className="fps-metrics">
              <div className="metric-item">
                <span className="m-label">FRAME_TIME</span>
                <span className="m-value">{ms} MS</span>
              </div>
              <div className="metric-item">
                <span className="m-label">SYNC_STATE</span>
                <span className="m-value green">STABLE</span>
              </div>
            </div>

            <div className="performance-gauge">
              <div className="gauge-outer"></div>
              <div className="gauge-inner" style={{ transition: 'transform 0.5s ease', transform: `rotate(${(Math.min(fps, 144) / 144) * 180 - 90}deg)` }}></div>
            </div>
          </div>

          <div className="visualizer-grid-lines visualizer-grid-lines--grid"></div>
        </div>
      ) : displayType === 'otp' ? (
        <div className="visualizer-container otp-mode">
          <div className="visualizer-header">SENTINEL OTP VAULT</div>

          <div className="otp-card-grid">
            {totpCodes && [
              { code: totpCodes.key1, color: 'red', label: 'KEY 01' },
              { code: totpCodes.key2, color: 'blue', label: 'KEY 02' },
              { code: totpCodes.key3, color: 'neutral', label: 'KEY 03' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="otp-card"
                onClick={() => item.code && navigator.clipboard.writeText(item.code)}
              >
                <div className="otp-card-header">
                  <div className="otp-card-label-wrap">
                    <span className={`otp-status otp-status-${item.color}`}></span>
                    <span className="otp-card-label">{item.label}</span>
                  </div>
                  <button type="button" className="otp-copy-button">COPY</button>
                </div>
                <div className={`otp-container otp-screen-container ${item.color}`}>
                  {item.code && item.code.split('').map((char, i) => (
                    <span key={i} className="otp-digit">{char}</span>
                  ))}
                </div>
                <div className="ripple-wrapper"><md-ripple></md-ripple></div>
              </div>
            ))}
          </div>

          <div className="visualizer-grid-lines visualizer-grid-lines--dots"></div>
        </div>
      ) : null}
    </main>
  );
};

export default MainContent;
