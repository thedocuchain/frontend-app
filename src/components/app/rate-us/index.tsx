import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import cn from 'classnames'

import { Column, RowCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { IconStar, IconStarFull } from 'src/icons'
import { Space } from 'src/components/ui/space'

import styles from './styles.module.css'

export function RateUs() {
  const [activeStar, setActiveStar] = useState<number>()
  const [rateStar, setRateStar] = useState<number>()

  const handleActiveStar = useEvent((index: number) => {
    setActiveStar(index)
  })

  const handleRateStar = useEvent((index: number) => {
    setRateStar(index)
  })

  return (
    <Column className='column-center'>
      <Text theme={'headline-3'}>Rate us</Text>
      <Space size={12} />
      <RowCenter className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={cn({ [styles.activeStar]: activeStar >= star, [styles.fullStar]: rateStar >= star })}
            onClick={() => handleRateStar(star)}
            onMouseEnter={() => handleActiveStar(star)}
            onMouseLeave={() => handleActiveStar(undefined)}
          >
            {rateStar >= star ? <IconStarFull /> : <IconStar />}
          </div>
        ))}
      </RowCenter>
    </Column>
  )
}
