import React from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Column, Row } from 'src/components/ui/grid'
import { IconCheckCircle, IconInfoCircle } from 'src/icons'
import { Space } from 'src/components/ui/space'
import { Input } from 'src/components/ui/input'

import styles from './styles.module.css'

export function Alert(props: {
  type?: 'error' | 'warning' | 'info' | 'success'
  isForm?: boolean
  title?: string
  description?: string
  buttonNamePrimary?: string
  buttonNameSecondary?: string
  onSubmit?: () => void
  onSubmitSecondary?: () => void
}) {
  const { type, isForm, title, description, buttonNamePrimary, buttonNameSecondary, onSubmit, onSubmitSecondary } =
    props

  const cl = cn(styles.wrapper, {
    [styles.info]: type === 'info' || type === undefined,
    [styles.error]: type === 'error',
    [styles.warning]: type === 'warning',
    [styles.success]: type === 'success',
  })

  return (
    <div className={cl}>
      <div className={styles.icon}>
        {type !== 'success' && <IconInfoCircle />}
        {type === 'success' && <IconCheckCircle />}
      </div>

      <Column className='w100-p'>
        {title && <Text theme={'headline-3'}>{title}</Text>}
        {description && (
          <>
            <Space size={4} />
            <Text theme={'body-3'}>{description}</Text>
          </>
        )}

        {isForm && onSubmit && (
          <>
            <Space size={10} />

            <div className={styles.form}>
              <Input placeholder={'john.doe@gmail.com'} />

              <Button onClick={onSubmit} theme='secondary' className={styles.button}>
                Confirm
              </Button>
            </div>

            <Space size={10} />
          </>
        )}

        {!isForm && (
          <>
            <Space size={16} />
            <Row className='gap10'>
              {buttonNamePrimary && onSubmit && (
                <Button theme={'link-primary'} onClick={onSubmit}>
                  {buttonNamePrimary}
                </Button>
              )}

              {buttonNameSecondary && onSubmitSecondary && (
                <Button theme={'link-secondary'} onClick={onSubmitSecondary}>
                  {buttonNameSecondary}
                </Button>
              )}
            </Row>
          </>
        )}
      </Column>
    </div>
  )
}
