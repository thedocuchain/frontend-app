import React from 'react'

import { Text } from 'src/components/ui/typography'
import { Row } from 'src/components/ui/grid'

export function TableHeadWithoutSort({ isDoneSigned }: { isDoneSigned: boolean }) {
  return (
    <thead>
      <tr>
        <td style={{ width: '60%' }}>
          <Row>
            <Text theme={'label-3'} className={'color-text-secondary'}>
              Participants
            </Text>
          </Row>
        </td>
        <td style={{ width: 144 }}>
          <Row>
            <Text theme={'label-3'} className={'color-text-secondary'}>
              Role
            </Text>
          </Row>
        </td>
        <td style={{ width: 144 }}>
          <Row>
            <Text theme={'label-3'} className={'color-text-secondary'}>
              Status
            </Text>
          </Row>
        </td>
        {!isDoneSigned && <td style={{ width: 72 }} />}
      </tr>
    </thead>
  )
}
