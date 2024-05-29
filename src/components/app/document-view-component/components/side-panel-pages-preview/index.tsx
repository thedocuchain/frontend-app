import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { IconClose, IconFileGrey } from 'src/icons'
import { RowBetweenCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { PdfViewPage } from 'src/components/app/pdf-view-page'
import { useIsMobile } from 'src/utils/use/use-is-mobile'

import styles from './styles.module.css'

export function SidePanelPagesPreview(props: {
  isOpen: boolean
  setOpen: (boolean) => void
  isErrorLoadingPdf: boolean
}) {
  const { isOpen, setOpen, isErrorLoadingPdf } = props
  const [isDeleted, setDeleted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => setOpen(false), 300)
    }
  }, [isDeleted])

  const handleOpen = useEvent(() => {
    setOpen(true)
    setDeleted(false)
  })

  if (isMobile) return null
  if (isErrorLoadingPdf) return null

  return (
    <>
      <div className={cn(styles.iconWrapper, { 'display-none': isOpen })}>
        <div className={cn(styles.icon, 'on-click')} onClick={handleOpen}>
          <IconFileGrey />
        </div>
      </div>

      <div className={cn(styles.wrapper, { 'display-none': !isOpen })}>
        <div className={cn(styles.sidePanel, { [styles.slideOutLeft]: isDeleted })}>
          <RowBetweenCenter className={styles.closeBlock}>
            <Text theme={'headline-4'}>Pages</Text>

            <IconClose onClick={() => setDeleted(true)} className='on-click' />
          </RowBetweenCenter>

          <PdfViewPage isOpenSidePanel={isOpen} isSidePanel />
        </div>
      </div>
    </>
  )
}
