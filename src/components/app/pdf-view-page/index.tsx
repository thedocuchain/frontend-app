'use client'

import type { PDFDocumentProxy } from 'pdfjs-dist'

import { pdfjs, Document } from 'react-pdf'
import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import cn from 'classnames'
import { wait } from '@coxy/utils'

import { Text } from 'src/components/ui/typography'
import { PageView } from 'src/components/app/pdf-view-page/page'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { Loader } from 'src/components/ui/loader'
import { ThumbnailView } from 'src/components/app/pdf-view-page/thumbnail'
import { OverlayBlur } from 'src/components/app/overlay-blur'
import { useIsMobile } from 'src/utils/use/use-is-mobile'
import { MockPage } from 'src/components/ui/mock-page'
import { EmptyState } from 'src/components/ui/empty-state'
import { MockPageSidePanel } from 'src/components/ui/mock-page-side-panel'

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

type ComponentProps = {
  isOpenSidePanel?: boolean
  isSidePanel?: boolean
  // isDocumentPreview?: boolean
  setErrorLoadingPdf?: (boolean) => void
}

export function PdfViewPage(props: ComponentProps) {
  const { isOpenSidePanel, isSidePanel, setErrorLoadingPdf } = props
  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [loadKey, setLoadKey] = useState(0)
  const isMobile = useIsMobile()
  const [isLoading, setIsLoading] = useState(true)

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries

    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  async function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): Promise<void> {
    if (setErrorLoadingPdf) {
      setErrorLoadingPdf(false)
    }
    setNumPages(nextNumPages)

    await wait(500)
    setIsLoading(false)
  }

  function onDocumentLoadError() {
    setTimeout(() => setLoadKey((k) => k + 1), 200)
  }

  const documentData = useAppSelector(selectedDocument)
  const url = documentData?.downloadLink

  if (!url) return null

  if (isSidePanel && isMobile) return null

  return (
    <div className={cn(styles.pageContainer, { [styles.sidePanelContainer]: isSidePanel })} ref={setContainerRef}>
      {isLoading && isSidePanel && <Loader />}
      {isLoading && !isSidePanel && <OverlayBlur title={'Loading file...'} />}

      <Document
        key={loadKey}
        file={url}
        className={isLoading ? 'display-none' : null}
        loading={null}
        error={
          isSidePanel ? (
            <MockPageSidePanel />
          ) : (
            <MockPage containerWidth={containerWidth} maxWidth={maxWidth}>
              <EmptyState type={'error'} />
            </MockPage>
          )
        }
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        options={options}
      >
        {isSidePanel ? (
          <>
            {!isMobile && (
              <>
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    id={`side-panel-page_${index + 1}`}
                    key={`page_${index + 1}`}
                    className={cn('column', styles.sidePanelPageWrapper)}
                  >
                    <ThumbnailView
                      isOpenSidePanel={isOpenSidePanel}
                      isSidePanel={isSidePanel}
                      pageId={`page_${index + 1}`}
                      index={index}
                      isLoading={isLoading}
                    />

                    <Text theme={'body-3'} className={'color-text-secondary'}>
                      {index + 1}
                    </Text>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {/* Heavy PDFs crash the app on mobile due to render pressure; cap rendered pages at 100 as a workaround. */}
            {numPages > 101 && isMobile ? (
              <>
                {Array.from(new Array(numPages), (el, index) => {
                  if (index < 50 || index > numPages - 50) {
                    return (
                      <div id={`page_${index + 1}`} key={`page_${index + 1}`}>
                        <PageView
                          isLoading={isLoading}
                          index={index}
                          containerWidth={containerWidth}
                          maxWidth={maxWidth}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </>
            ) : (
              <>
                {Array.from(new Array(numPages), (el, index) => (
                  <div id={`page_${index + 1}`} key={`page_${index + 1}`}>
                    <PageView isLoading={isLoading} index={index} containerWidth={containerWidth} maxWidth={maxWidth} />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </Document>
    </div>
  )
}
