import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PdfViewer from '../PdfViewer';

const MainContent = ({ displayType, renderedMarkdown, currentPdf, currentImage }) => {
  return (
    <main className={`content-area ${displayType === 'video' ? 'video-mode' : ''}`}>
      {displayType === 'markdown' ? (
        <article className="markdown-body">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {renderedMarkdown}
          </ReactMarkdown>
        </article>
      ) : displayType === 'pdf' ? (
        <PdfViewer file={currentPdf.src} />
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
      ) : null}
    </main>
  );
};

export default MainContent;
