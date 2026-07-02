import React, { useState } from 'react'

import { Column, RowCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import {
  IconFacebookLogo,
  IconGithubLogo,
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
      <Text theme={'headline-3'} className={styles.text}>
        Share your experience
      </Text>
      <Space size={12} />
      <RowCenter className={styles.row}>
        <ButtonWrapper href={'https://x.com/thedocuchain'}>
          <IconXLogo className={styles.iconX} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.facebook.com/profile.php?id=61558223463250'}>
          <IconFacebookLogo className={styles.iconFb} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.instagram.com/docuchain/'}>
          <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ? <IconInstagramLogo /> : <IconInstagramDefaultLogo />}
          </span>
        </ButtonWrapper>
        <ButtonWrapper href={'https://t.me/docuchainio'}>
          <IconTelegramLogo className={styles.iconTg} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.linkedin.com/in/docuchain-service-96124a302/'}>
          <IconLinkedinLogo className={styles.iconIn} />
        </ButtonWrapper>
        <ButtonWrapper href={'https://github.com/thedocuchain'}>
          <IconGithubLogo className={styles.iconGh} />
        </ButtonWrapper>
      </RowCenter>
    </Column>
  )
}
