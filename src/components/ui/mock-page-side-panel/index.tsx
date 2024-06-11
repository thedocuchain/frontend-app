import React from 'react'

import { IconEmptyContentError } from 'src/icons'
import { Space } from 'src/components/ui/space'
import { Text } from 'src/components/ui/typography'
import { Column } from 'src/components/ui/grid'

import styles from './styles.module.css'

export function MockPageSidePanel() {
  return (
    <div className={styles.mockPage}>
      <Column className='column-center'>
        <Space size={20} />

        <IconEmptyContentError className={styles.icon} />

        <Text theme={'label-3'} className={'text-center'}>
          Document
          <br />
          loading issue
        </Text>
      </Column>
    </div>
  )
}
