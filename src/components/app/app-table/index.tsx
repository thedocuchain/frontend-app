import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { TableRow } from 'src/components/app/app-table/components/table-row'
import { SortOrder, SortType, TableHead } from 'src/components/app/app-table/components/table-head'
import { SortingTag } from 'src/components/app/app-table/components/sorting-tag'
import { User } from 'src/store/reducers/document/types'

import styles from './styles.module.css'

export function AppTable(props: { participants: User[] }) {
  const { participants } = props
  const [sortType, setSortType] = useState<SortType>('role')
  const [sortOrder, setOrder] = useState<SortOrder>('ASC')
  const [isDoneSigned, setDoneSigned] = useState(false)
  const awaiting = useMemo(
    () =>
      [...participants]
        .filter((el) => el.signature?.signed !== undefined && !el.signature.signed)
        .sort((a, b) => a.name?.localeCompare(b?.name)),
    [participants],
  )
  const signed = useMemo(
    () => [...participants].filter((el) => el.signature?.signed).sort((a, b) => a.name?.localeCompare(b?.name)),
    [participants],
  )
  const watchers = useMemo(
    () => [...participants].filter((el) => el.role.name === 'watcher').sort((a, b) => a.name?.localeCompare(b?.name)),
    [participants],
  )
  const signers = useMemo(
    () => [...participants].filter((el) => el.role.name === 'signer').sort((a, b) => a.name?.localeCompare(b?.name)),
    [participants],
  )

  useEffect(() => {
    const isDone = participants.filter((el) => el.role.name === 'signer').every((el) => el.signature?.signed)
    setDoneSigned(isDone)
  }, [participants])

  const handleSetSortType = useEvent((type: SortType) => {
    setSortType(type)
    if (sortOrder !== 'ASC') setOrder('ASC')
  })

  const handleSortParticipants = useCallback(() => {
    if (sortType === 'participants' && sortOrder === 'ASC') {
      return [...participants].sort((a, b) => a.name?.localeCompare(b?.name))
    }
    if (sortType === 'participants' && sortOrder === 'DESC') {
      return [
        ...[...participants].filter((el) => !el.name),
        ...[...participants].filter((el) => el.name).sort((a, b) => b.name?.localeCompare(a?.name)),
      ]
    }

    if (isDoneSigned && sortType !== 'participants') {
      setSortType('participants')
    }
    if (isDoneSigned) {
      return
    }

    if (sortType === 'role' && sortOrder === 'ASC') {
      return [...signers, ...watchers]
    }
    if (sortType === 'role' && sortOrder === 'DESC') {
      return [...watchers, ...signers]
    }
    if (sortType === 'status' && sortOrder === 'ASC') {
      return [...signed, ...awaiting, ...watchers]
    }
    if (sortType === 'status' && sortOrder === 'DESC') {
      return [...awaiting, ...signed, ...watchers]
    }
  }, [participants, sortType, sortOrder])

  const sortedList = handleSortParticipants()

  return (
    <div className={styles.tableContainer}>
      <div className='show-mobile'>
        <SortingTag sortType={sortType} setSortType={handleSetSortType} sortOrder={sortOrder} setOrder={setOrder} />
      </div>

      <table className={styles.table}>
        <TableHead
          isDoneSigned={isDoneSigned}
          sortType={sortType}
          setSortType={handleSetSortType}
          sortOrder={sortOrder}
          setOrder={setOrder}
        />
        <tbody>
          {sortedList?.map((item, index) => (
            <TableRow
              isDoneSigned={isDoneSigned}
              participantLength={sortedList.length}
              index={index}
              key={`${item.email}${index}`}
              participant={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
