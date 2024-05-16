import React, { useState } from 'react'

import { Column, RowCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import {
  IconFacebookLogo,
  IconInstagramDefaultLogo,
  IconInstagramLogo,
  IconLinkedinLogo,
  IconTelegramLogo,
  IconXLogo,
} from 'src/icons'
import { Space } from 'src/components/ui/space'
import { ButtonWrapper } from 'src/components/ui/button'

import styles from './styles.module.css'

export function Share() {
  const [hover, setHover] = useState(false)

  return (
    <Column className='column-center'>
      <Text theme={'headline-3'}>Share your experience</Text>
      <Space size={12} />
      <RowCenter className={styles.row}>
        <ButtonWrapper href={'https://twitter.com/'}>
          <IconXLogo className={styles.iconX} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.facebook.com/'}>
          <IconFacebookLogo className={styles.iconFb} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://instagram.com/'}>
          <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ? <IconInstagramLogo /> : <IconInstagramDefaultLogo />}
          </span>
        </ButtonWrapper>
        <ButtonWrapper href={'https://t.me/'}>
          <IconTelegramLogo className={styles.iconTg} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.linkedin.com/'}>
          <IconLinkedinLogo className={styles.iconIn} />
        </ButtonWrapper>
      </RowCenter>
    </Column>
  )
}
