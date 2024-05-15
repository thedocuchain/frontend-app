import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { DocumentType } from 'src/store/reducers/document/types'
import { IconClose, IconFileGrey } from 'src/icons'
import { Column, RowBetweenCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'

import DocPreview from './doc-preview.png'
import styles from './styles.module.css'

export function SidePanelPagesPreview(props: { document: DocumentType; isOpen: boolean; setOpen: (boolean) => void }) {
  const { pages } = props.document
  const { isOpen, setOpen } = props
  const [isDeleted, setDeleted] = useState(false)
  const activePage = 1
  const listPages = Array.from(Array(pages).keys())

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => setOpen(false), 300)
    }
  }, [isDeleted])

  const handleOpen = useEvent(() => {
    setOpen(true)
    setDeleted(false)
  })

  if (!isOpen)
    return (
      <div className={styles.iconWrapper}>
        <div className={cn(styles.icon, 'on-click')} onClick={handleOpen}>
          <IconFileGrey />
        </div>
      </div>
    )

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.sidePanel, { [styles.slideOutLeft]: isDeleted })}>
        <RowBetweenCenter className={styles.closeBlock}>
          <Text theme={'headline-4'}>Pages</Text>

          <IconClose onClick={() => setDeleted(true)} className='on-click' />
        </RowBetweenCenter>
        <div className={styles.sidePanelContent}>
          {listPages?.map((el, index) => (
            <Column key={el} className={cn(styles.page, { [styles.activePage]: activePage === index })}>
              <img src={DocPreview.src} alt='' className={styles.img} />
              <Text theme={'body-3'} className={'color-text-secondary'}>
                {index + 1}
              </Text>
            </Column>
          ))}
        </div>
      </div>
    </div>
  )
}
