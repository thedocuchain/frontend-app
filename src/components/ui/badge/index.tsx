import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { IconCheck, IconRefresh } from 'src/icons'

import styles from './styles.module.css'

export function Badge(props: { type: 'signed' | 'awaiting' }) {
  if (props.type === 'awaiting')
    return (
      <div className={cn(styles.badge, styles.awaiting)}>
        <IconRefresh />

        <Text className={styles.awaitingText} theme={'label-3'}>
          Awaiting
        </Text>
      </div>
    )

  return (
    <div className={cn(styles.badge, styles.signed)}>
      <IconCheck />

      <Text className={styles.signedText} theme={'label-3'}>
        Signed
      </Text>
    </div>
  )
}
