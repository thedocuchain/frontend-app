import React from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

export function GuideLabel(props: { title: string; positionY?: number }) {
  const { positionY } = props
  const style =
    positionY !== undefined
      ? { bottom: positionY - 20, left: '-78px' }
      : { right: 'calc(100% + 8px + 12px)', marginTop: '-6px' }

  return (
    <div className={cn(styles.label, { 'hide-tablet': positionY !== undefined })} style={style}>
      <Text theme={'label-2'}>{props.title}</Text>
    </div>
  )
}
