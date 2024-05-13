import React from 'react'
import cn from 'classnames'

import { Badge } from 'src/components/ui/badge'
import { Column, Row, RowBetweenCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { Avatar } from 'src/components/app/avatar'
import { Space } from 'src/components/ui/space'
import { DotsTable } from 'src/components/app/app-table/components/dots'
import { Recipient } from 'src/store/reducers/document/types'

import styles from './styles.module.css'

export function TableRow(props: {
  index: number
  participantLength: number
  isDoneSigned: boolean
  participant: Recipient
}) {
  const { name, email, role, status, lastRemind } = props.participant
  const isSigner = role === 'signer'
  const isLastRow = props.index + 1 === props.participantLength

  return (
    <tr className={isLastRow ? styles.isLastRow : null}>
      <td>
        <Row className='align-center'>
          <Avatar name={name} index={props.index} />
          <Space horizontal size={12} />
          <Column className='w100-p white-space-nowrap'>
            <RowBetweenCenter className='gap10'>
              <Text theme={'body-3'} className={styles.name}>
                {name}
              </Text>

              <div className='show-mobile'>{isSigner && <Badge type={status} />}</div>
            </RowBetweenCenter>

            <Text theme={'body-3'} className={cn(styles.text, 'color-text-secondary')}>
              <span className='show-mobile capitalize'>{role} &#183; </span>
              {email}
            </Text>
          </Column>
        </Row>
      </td>
      <td className={styles.hide}>
        <Text theme={'body-3'} className='hide-mobile color-text-secondary capitalize'>
          {role}
        </Text>
      </td>
      <td className={styles.hide}>
        <div className='hide-mobile'>{isSigner && <Badge type={status} />}</div>
      </td>
      {!props.isDoneSigned && (
        <td>
          {isSigner && status !== 'signed' && <DotsTable lastRemind={lastRemind} title={`Actions for ${name}`} />}
        </td>
      )}
    </tr>
  )
}
