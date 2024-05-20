'use client'

import { Page } from 'react-pdf'
import cn from 'classnames'

import { useIsInViewport } from 'src/utils/use/use-is-in-viewport'

import styles from '../styles.module.css'

export function PageView(props: {
  isSidePanel?: boolean
  index: number
  id: string
  containerWidth?: number
  maxWidth: number
}) {
  const { isSidePanel, index, id, containerWidth, maxWidth } = props

  const isInVP = useIsInViewport(id)

  return (
    <Page
      className={cn(styles.page, {
        [styles.sidePanelPage]: isSidePanel,
        [styles.activePage]: isSidePanel && isInVP,
      })}
      pageNumber={index + 1}
      width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
    />
  )
}
