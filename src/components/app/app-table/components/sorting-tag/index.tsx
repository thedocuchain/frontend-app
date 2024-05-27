import React, { FocusEvent, MouseEvent, useCallback, useRef, useState } from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'

import { BottomSheet } from 'src/components/ui/dropdown/components/bottomsheet-mobile'
import { Text } from 'src/components/ui/typography'
import { RowCenter } from 'src/components/ui/grid'
import { SortOrder, SortType } from 'src/components/app/app-table/components/table-head'
import { IconArrowDownLong } from 'src/icons'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

export function SortingTag(props: {
  sortOrder: SortOrder
  setOrder: (order: SortOrder) => void
  sortType: SortType
  setSortType: (type: SortType) => void
}) {
  const { sortType, setSortType, sortOrder, setOrder } = props
  const [isVisible, setVisible] = useState(false)
  const refTimer = useRef<TimeoutId>()

  const handleClose = useEvent(() => {
    setVisible(false)
  })

  const handleOpen = useEvent((event?: MouseEvent<HTMLElement> | FocusEvent<HTMLDivElement>) => {
    if (event) {
      event.stopPropagation()
    }
    clearTimeout(refTimer.current)
    refTimer.current = setTimeout(() => {
      if (!isVisible) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  })

  const handleSetSortType = useCallback(
    (type: SortType, order: SortOrder) => (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()

      if (sortType === type) {
        setOrder(order === 'ASC' ? 'DESC' : 'ASC')
        return
      }
      setSortType(type)
      setOrder('ASC')
    },
    [sortType, sortOrder],
  )

  function SetArrow(): JSX.Element {
    if (sortOrder === 'ASC') return <IconArrowDownLong className={styles.arrowLong} />
    if (sortOrder === 'DESC') return <IconArrowDownLong className={cn(styles.arrowLong, styles.arrowRotate)} />
  }

  return (
    <div className={styles.wrapper} onClick={handleOpen}>
      <div className={styles.tag}>
        <Text theme={'body-3'} className='color-text-secondary'>
          Sort by:{' '}
        </Text>
        <Text theme={'label-2'} className='capitalize'>
          {sortType}
        </Text>
        <SetArrow />
      </div>

      <BottomSheet title={'Sort by'} onClose={handleClose} visible={isVisible}>
        <div className={styles.list}>
          <div
            onClick={handleSetSortType('participants', sortOrder)}
            className={cn(styles.item, { [styles.itemActive]: sortType === 'participants' })}
          >
            <Text theme={'body-2'}>Participants</Text>

            {sortType === 'participants' && (
              <RowCenter className={styles.order}>
                <Text theme={'button-sm'} className=''>
                  {sortOrder === 'ASC' ? 'Low to high' : 'High to low'}
                </Text>
                <SetArrow />
              </RowCenter>
            )}
          </div>
          <div
            onClick={handleSetSortType('role', sortOrder)}
            className={cn(styles.item, { [styles.itemActive]: sortType === 'role' })}
          >
            <Text theme={'body-2'}>Role</Text>

            {sortType === 'role' && (
              <RowCenter className={styles.order}>
                <Text theme={'button-sm'} className=''>
                  {sortOrder === 'ASC' ? 'Low to high' : 'High to low'}
                </Text>
                <SetArrow />
              </RowCenter>
            )}
          </div>
          <div
            onClick={handleSetSortType('status', sortOrder)}
            className={cn(styles.item, { [styles.itemActive]: sortType === 'status' })}
          >
            <Text theme={'body-2'}>Status</Text>

            {sortType === 'status' && (
              <RowCenter className={styles.order}>
                <Text theme={'button-sm'} className=''>
                  {sortOrder === 'ASC' ? 'Low to high' : 'High to low'}
                </Text>
                <SetArrow />
              </RowCenter>
            )}
          </div>

          <Button className={styles.button} onClick={handleClose}>
            Done
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
