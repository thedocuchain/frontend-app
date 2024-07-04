import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Column, Row } from 'src/components/ui/grid'
import { IconCheckCircle, IconMail } from 'src/icons'
import { Space } from 'src/components/ui/space'

import styles from './styles.module.css'

export function Alert(
  props: PropsWithChildren & {
    type?: 'error' | 'warning' | 'info' | 'success'
    title?: string
    description?: string
    buttonNamePrimary?: string
    buttonNameSecondary?: string
    onSubmit?: () => void
    onSubmitSecondary?: () => void
    className?: string
  },
) {
  const {
    type,
    children,
    title,
    description,
    buttonNamePrimary,
    buttonNameSecondary,
    onSubmit,
    onSubmitSecondary,
    className,
  } = props

  const cl = cn(styles.wrapper, className, {
    [styles.info]: type === 'info' || type === undefined,
    [styles.error]: type === 'error',
    [styles.warning]: type === 'warning',
    [styles.success]: type === 'success',
  })

  return (
    <div className={cl}>
      <div className={styles.icon}>
        {type !== 'success' && <IconMail />}
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

        {children && (
          <>
            <Space size={10} />
            {children}
          </>
        )}

        {!children && (
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
