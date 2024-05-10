import React from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { IconArrowDownLong, IconArrows } from 'src/icons'
import { Row } from 'src/components/ui/grid'

import styles from './styles.module.css'

export type SortType = 'participants' | 'status' | 'role'
export type SortOrder = 'ASC' | 'DESC'

export function TableHead(props: {
  sortOrder: SortOrder
  setOrder: (order: SortOrder) => void
  sortType: SortType
  setSortType: (type: SortType) => void
  isDoneSigned: boolean
}) {
  const { sortType, setSortType, sortOrder, setOrder, isDoneSigned } = props

  const handleSetSortType = useEvent((type: SortType) => {
    if (sortType === type) {
      setOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    }
    setSortType(type)
  })

  function SetArrow(props: { type: SortType }): JSX.Element {
    if (sortType !== props.type) return <IconArrows className={styles.arrow} />
    if (sortType === props.type && sortOrder === 'ASC') return <IconArrowDownLong className={styles.arrowLong} />
    if (sortType === props.type && sortOrder === 'DESC')
      return <IconArrowDownLong className={cn(styles.arrowLong, styles.arrowRotate)} />
  }

  return (
    <thead>
      <tr>
        <td style={{ width: '60%' }} onClick={() => handleSetSortType('participants')}>
          <Row className={styles.row}>
            <Text
              theme={sortType === 'participants' ? 'headline-4' : 'label-3'}
              className={sortType === 'participants' ? null : 'color-text-secondary'}
            >
              Participants
            </Text>
            <SetArrow type={'participants'} />
          </Row>
        </td>
        <td style={{ width: 144 }} onClick={() => handleSetSortType('role')}>
          <Row className={styles.row}>
            <Text
              theme={sortType === 'role' ? 'headline-4' : 'label-3'}
              className={sortType === 'role' ? null : 'color-text-secondary'}
            >
              Role
            </Text>
            <SetArrow type={'role'} />
          </Row>
        </td>
        <td style={{ width: 144 }} onClick={() => handleSetSortType('status')}>
          <Row className={styles.row}>
            <Text
              theme={sortType === 'status' ? 'headline-4' : 'label-3'}
              className={sortType === 'status' ? null : 'color-text-secondary'}
            >
              Status
            </Text>
            <SetArrow type={'status'} />
          </Row>
        </td>
        {!isDoneSigned && <td style={{ width: 72 }} />}
      </tr>
    </thead>
  )
}
