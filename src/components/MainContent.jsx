import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PdfViewer from '../PdfViewer';

const MainContent = ({ currentSource, displayType, renderedMarkdown, currentPdf, currentImage, onPdfLoadFinish }) => {
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
      {(displayType !== 'video' && displayType !== 'visualizer') && (
        <header className="content-header">
          {displayType === 'markdown' && 'DOCUMENT_VIEWER'}
          {displayType === 'pdf' && 'SENTINEL_SECURE_PDF'}
          {displayType === 'image' && 'SECURE_IMAGE_ASSET'}
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
          <div className="visualizer-header">WORKSTATION_PERFORMANCE_SYNC</div>
          
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

          <div className="visualizer-grid-lines"></div>
        </div>
      ) : null}
    </main>
  );
};

export default MainContent;
