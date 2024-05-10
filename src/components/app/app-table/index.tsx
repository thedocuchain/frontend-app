import React, { useCallback, useEffect, useState } from 'react'

import { TableRow } from 'src/components/app/app-table/components/table-row'
import { SortOrder, SortType, TableHead } from 'src/components/app/app-table/components/table-head'
import { SortingTag } from 'src/components/app/app-table/components/sorting-tag'

import styles from './styles.module.css'

export function AppTable(props: {
  participants: {
    name: string
    email: string
    role: 'signer' | 'watcher'
    status: 'awaiting' | 'signed'
    lastRemind?: string
  }[]
}) {
  const { participants } = props
  const [sortType, setSortType] = useState<SortType>('participants')
  const [sortOrder, setOrder] = useState<SortOrder>('ASC')
  const [isDoneSigned, setDoneSigned] = useState(false)
  const participantsWithStatus = participants.filter((el) => el.status)
  const participantsWithoutStatus = participants.filter((el) => !el.status)

  useEffect(() => {
    const isDone = participantsWithStatus.every((el) => el.status === 'signed')
    setDoneSigned(isDone)
  }, [participants])

  const handleSortParticipants = useCallback(() => {
    if (sortType === 'participants' && sortOrder === 'ASC') {
      return [...participants].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortType === 'participants' && sortOrder === 'DESC') {
      return [...participants].sort((a, b) => b.name.localeCompare(a.name))
    }

    if (isDoneSigned && sortType !== 'participants') {
      setSortType('participants')
    }
    if (isDoneSigned) {
      return
    }

    if (sortType === 'role' && sortOrder === 'ASC') {
      return [...participants].sort((a, b) => a.role.localeCompare(b.role))
    }
    if (sortType === 'role' && sortOrder === 'DESC') {
      return [...participants].sort((a, b) => b.role.localeCompare(a.role))
    }
    if (sortType === 'status' && sortOrder === 'ASC') {
      return [
        ...[...participantsWithStatus].sort((a, b) => b.status.localeCompare(a.status)),
        ...participantsWithoutStatus,
      ]
    }
    if (sortType === 'status' && sortOrder === 'DESC') {
      return [
        ...[...participantsWithStatus].sort((a, b) => a.status.localeCompare(b.status)),
        ...participantsWithoutStatus,
      ]
    }
  }, [participants, sortType, sortOrder])

  const signers = handleSortParticipants()

  return (
    <div className={styles.tableContainer}>
      <div className='show-mobile'>
        <SortingTag sortType={sortType} setSortType={setSortType} sortOrder={sortOrder} setOrder={setOrder} />
      </div>

      <table className={styles.table}>
        <TableHead
          isDoneSigned={isDoneSigned}
          sortType={sortType}
          setSortType={setSortType}
          sortOrder={sortOrder}
          setOrder={setOrder}
        />
        <tbody>
          {signers?.map((item, index) => (
            <TableRow
              isDoneSigned={isDoneSigned}
              participantLength={signers.length}
              index={index}
              key={item.email}
              participant={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
