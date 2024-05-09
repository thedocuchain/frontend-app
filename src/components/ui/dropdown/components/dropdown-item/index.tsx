import React, { ReactElement } from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { IconCheck } from 'src/icons'
import { RowBetweenCenter } from 'src/components/ui/grid'

import styles from './styles.module.css'

export interface ComponentProps {
  title: string
  description?: string
  isActive?: boolean
  renderFrom?: 'list' | 'item'
}

export function DropdownItem(props: ComponentProps): ReactElement<HTMLSelectElement> {
  const { title, description, isActive, renderFrom } = props

  return (
    <div
      id={isActive && renderFrom === 'list' ? 'dropdown-item-active' : ''}
      className={cn(styles.wrapper, {
        [styles.isActive]: isActive && renderFrom === 'list',
        [styles.wrapperList]: renderFrom === 'list',
        [styles.renderFromItem]: renderFrom === 'item',
      })}
    >
      <RowBetweenCenter>
        <Text theme='body-2'>{title}</Text>
        {isActive && renderFrom === 'list' && <IconCheck className={styles.icon} />}
      </RowBetweenCenter>
      {description && renderFrom === 'list' && (
        <Text theme='body-3' className='color-text-secondary'>
          {description}
        </Text>
      )}
    </div>
  )
}
