import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({ file }) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-viewer-container simple-scroll">
            <div className="pdf-document-wrapper">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div className="loading-text">Đang tải PDF...</div>}
                    error={<div className="error-text">Không thể tải PDF.</div>}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderAnnotationLayer={false}
                            renderTextLayer={true}
                            className="pdf-page-item"
                        />
                    ))}
                </Document>
            </div>
        </div>
    );
}

export default PdfViewer;
