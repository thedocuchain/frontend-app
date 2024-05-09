import { RowBetweenCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'

import styles from './style.module.css'

type ComponentProps = {
  value: number
  isNoPercent?: boolean
}

export function ProgressBar(props: ComponentProps) {
  const { value, isNoPercent } = props
  const percent = (value * 100) / 100

  return (
    <RowBetweenCenter className={styles.container}>
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: `${percent}%` }}></div>
      </div>
      {!isNoPercent && (
        <>
          <Space horizontal size={10} />
          <Text theme='body-3' className='color-text-secondary'>
            {percent}%
          </Text>
        </>
      )}
    </RowBetweenCenter>
  )
}
