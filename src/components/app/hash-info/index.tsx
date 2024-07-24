import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

import { Text } from 'src/components/ui/typography'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { IconArrowDown } from 'src/icons'
import { Column } from 'src/components/ui/grid'
import { HashRow } from 'src/components/app/hash-info/components/hash-row'

import styles from './styles.module.css'

export function HashInfo() {
  const document = useAppSelector(selectedDocument)
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const data: { title: string; data: string }[] = [
    { title: 'Original SHA256:', data: document?.originalHash },
    { title: 'Result SHA256:', data: document?.hash },
    { title: 'Blockchain tx:', data: document?.blockchainTransaction },
  ]

  const refTimer = useRef<TimeoutId>()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }

    if (!isOpen) {
      refTimer.current = setTimeout(() => {
        setIsVisible(false)
      }, 200)
    }
    return () => {
      clearTimeout(refTimer.current)
    }
  }, [isOpen])

  return (
    <Column className={styles.container}>
      <div className={'pointer flex-row gap6 align-center'} onClick={() => setIsOpen(!isOpen)}>
        <Text theme={'label-2'} className='color-text-secondary white-space-nowrap'>
          Show details
        </Text>
        <IconArrowDown className={cn(styles.arrow, { [styles.isOpen]: isOpen })} />
      </div>

      <Column
        className={cn({
          [styles.isOpenDisplayBlock]: isOpen,
          [styles.hide]: !isOpen,
          [styles.displayNone]: !isVisible,
        })}
      >
        {data.map((item) => (
          <HashRow key={item.data} title={item.title} data={item.data} />
        ))}
      </Column>
    </Column>
  )
}
