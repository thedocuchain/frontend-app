import React from 'react'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

export function GuideLabel(props: { title: string; positionY?: number }) {
  const { positionY } = props
  const style =
    positionY !== undefined
      ? { top: positionY, left: '-56px' }
      : { right: 'calc(100% + 8px + 12px)', marginTop: '-6px' }

  return (
    <div className={styles.label} style={style}>
      <Text theme={'label-2'}>{props.title}</Text>
    </div>
  )
}
