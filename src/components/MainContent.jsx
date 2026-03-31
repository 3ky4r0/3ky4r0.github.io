import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PdfViewer from '../PdfViewer';

const MainContent = ({ displayType, renderedMarkdown, currentPdf, currentImage }) => {
  return (
    <main className="content-area">
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
      ) : (
        <div className="image-viewer-centered">
          <img 
            src={currentImage.src} 
            alt={currentImage.label} 
            className="centered-img" 
          />
        </div>
      )}
    </main>
  );
};

export default MainContent;
