'use client'

import { Thumbnail } from 'react-pdf'
import cn from 'classnames'
import React, { useEffect } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { useIsInViewport, useIsInViewportPartially } from 'src/utils/use/use-is-in-viewport'

import styles from './styles.module.css'

export function ThumbnailView(props: {
  isOpenSidePanel?: boolean
  isSidePanel?: boolean
  index: number
  pageId: string
}) {
  const { index, pageId, isSidePanel, isOpenSidePanel } = props
  const sidePanelId = `side-panel-${pageId}`

  const isInVPPage = useIsInViewportPartially(pageId)
  const isInVPSidePanel = useIsInViewport(sidePanelId)
  const isActivePage = isSidePanel && isInVPPage

  const handleClickSidePanel = useEvent((e: Event) => {
    e.preventDefault()
    const element = document.getElementById(pageId)
    const headerOffset = 70
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  })

  const handleScrollSidePanelIntoView = useEvent(() => {
    const elementPage = document.getElementById(sidePanelId)
    const elementPosition = elementPage.getBoundingClientRect().top
    const container = document.getElementById('side-panel-container')

    container?.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  })

  // todo fix when open
  useEffect(() => {
    if (isInVPPage && isOpenSidePanel && !isInVPSidePanel) {
      handleScrollSidePanelIntoView()
    }
  }, [isOpenSidePanel, isInVPPage, isInVPSidePanel])

  if (isSidePanel)
    return (
      <Thumbnail
        width={146}
        onItemClick={() => null}
        onClick={handleClickSidePanel}
        className={cn(styles.page, styles.sidePanelPage, {
          [styles.activePage]: isActivePage,
        })}
        pageNumber={index + 1}
      />
    )

  return (
    <Thumbnail
      width={146}
      onItemClick={() => null}
      className={cn(styles.page, styles.isDocumentPreview)}
      pageNumber={index + 1}
    />
  )
}
