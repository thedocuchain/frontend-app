'use client'

import type { PDFDocumentProxy } from 'pdfjs-dist'

import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page } from 'react-pdf'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import styles from './styles.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

const resizeObserverOptions = {}

const maxWidth = 800

export function PdfViewPage() {
  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries

    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  const local = `http://localhost:3000/sample.pdf`

  return (
    <div className={styles.pageContainer} ref={setContainerRef}>
      <Document file={local} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            className={styles.page}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
          />
        ))}
      </Document>
    </div>
  )
}
