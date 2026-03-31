import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PdfViewer from '../PdfViewer';

const MainContent = ({ displayType, renderedMarkdown, currentPdf, currentImage, onPdfLoadFinish }) => {
  return (
    <main className={`content-area ${displayType === 'video' ? 'video-mode' : ''}`}>
      {displayType === 'markdown' ? (
        <article className="markdown-body">
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
        <div className="visualizer-container">
          <div className="visualizer-header">SYSTEM_ACTIVITY_MONITOR</div>
          <div className="visualizer-bars">
            {Array.from({ length: 48 }).map((_, i) => (
              <div 
                key={i} 
                className="v-bar" 
                style={{ '--delay': `${i * 0.05}s`, '--height': `${20 + Math.random() * 60}%` }}
              ></div>
            ))}
          </div>
          <div className="visualizer-grid-lines"></div>
        </div>
      ) : null}
    </main>
  );
};

export default MainContent;
