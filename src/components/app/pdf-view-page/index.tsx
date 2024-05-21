'use client'

import type { PDFDocumentProxy } from 'pdfjs-dist'

import { pdfjs, Document } from 'react-pdf'
import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Text } from 'src/components/ui/typography'
import { PageView } from 'src/components/app/pdf-view-page/page'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { Loader } from 'src/components/ui/loader'

import styles from './styles.module.css'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

const resizeObserverOptions = {}

const maxWidth = 800

export function PdfViewPage(props: { isSidePanel?: boolean; isDocumentPreview?: boolean }) {
  const { isSidePanel, isDocumentPreview } = props
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

  const handleClick = useEvent((index: number) => {
    if (!isSidePanel) return
    if (isDocumentPreview) return

    const element = document.getElementById(`page_${index + 1}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })

  const documentData = useAppSelector(selectedDocument)
  const local = documentData.url

  if (isDocumentPreview)
    return (
      <div className={''} ref={setContainerRef}>
        <Document loading={<Loader />} file={local} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          <div
            id={undefined}
            className={cn('column', {
              [styles.documentPreviewContainer]: isDocumentPreview,
            })}
          >
            <PageView
              isDocumentPreview={isDocumentPreview}
              id={`page_${1}`}
              index={0}
              containerWidth={containerWidth}
              maxWidth={maxWidth}
            />
          </div>
        </Document>
      </div>
    )

  return (
    <div className={cn(styles.pageContainer, { [styles.sidePanelContainer]: isSidePanel })} ref={setContainerRef}>
      <Document loading={<Loader />} file={local} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        {Array.from(new Array(numPages), (el, index) => (
          <div
            id={!isSidePanel ? `page_${index + 1}` : undefined}
            key={`page_${index + 1}`}
            className={cn('column', {
              [styles.sidePanelPageWrapper]: isSidePanel,
            })}
            onClick={() => handleClick(index)}
          >
            <PageView
              isSidePanel={isSidePanel}
              id={`page_${index + 1}`}
              index={index}
              containerWidth={containerWidth}
              maxWidth={maxWidth}
            />

            {isSidePanel && (
              <Text theme={'body-3'} className={'color-text-secondary'}>
                {index + 1}
              </Text>
            )}
          </div>
        ))}
      </Document>
    </div>
  )
}
