import React from 'react'

import { Column, RowCenter } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { IconFacebookLogo, IconInstagramLogo, IconLinkedinLogo, IconTelegramLogo, IconXLogo } from 'src/icons'
import { Space } from 'src/components/ui/space'
import { ButtonWrapper } from 'src/components/ui/button'

import styles from './styles.module.css'

export function Share() {
  return (
    <Column className='column-center'>
      <Text theme={'headline-3'}>Share your experience</Text>
      <Space size={16} />
      <RowCenter className={styles.row}>
        <ButtonWrapper href={'https://twitter.com/'}>
          <IconXLogo />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.linkedin.com/'}>
          <IconLinkedinLogo />
        </ButtonWrapper>
        <ButtonWrapper href={'https://instagram.com/'}>
          <IconInstagramLogo />
        </ButtonWrapper>
        <ButtonWrapper href={'https://www.facebook.com/'}>
          <IconFacebookLogo />
        </ButtonWrapper>
        <ButtonWrapper href={'https://t.me/'}>
          <IconTelegramLogo />
        </ButtonWrapper>
      </RowCenter>
    </Column>
  )
}
