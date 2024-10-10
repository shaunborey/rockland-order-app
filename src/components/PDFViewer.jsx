import React, { useState, useMemo } from 'react';
import { Document, Page } from 'react-pdf';

function PDFViewer({ PdfBase64String }) {
    const [pageCount, setPageCount] = useState(0);

    const onPDFLoadSuccess = ({ numPages }) => {
        setPageCount(numPages);
    }

    const fileUrl = useMemo(() => { return PdfBase64String; }, [PdfBase64String]);

    return (
        <Document file={fileUrl} onLoadSuccess={onPDFLoadSuccess}>
            {Array.from(
                new Array(pageCount),
                (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} width={1100} />
                ),
            )}
        </Document>
    );
}

export default PDFViewer;