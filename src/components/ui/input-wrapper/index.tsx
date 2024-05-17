import React, { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { ValidatorField } from '@coxy/react-validator'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

type ValidatorFieldType = Parameters<typeof ValidatorField>[0] & { isVisibleErrors: boolean }

export function InputValidatorField(props: ValidatorFieldType & { className?: string }) {
  return (
    <ValidatorField {...props}>
      {({ isValid, message }) => (
        <div className={cn(styles.wrapperInput, props.className)}>
          {React.Children.map(props.children as ReactNode, (el: ReactElement) => {
            return React.cloneElement(el, {
              isVisibleError: !isValid && props.isVisibleErrors,
            })
          })}

          {!isValid && props.isVisibleErrors && <InputError>{message}</InputError>}
        </div>
      )}
    </ValidatorField>
  )
}

export function InputError(props: PropsWithChildren & { isVisibleError?: boolean; className?: string }) {
  if (props.isVisibleError === false) {
    return null
  }
  return (
    <Text className={cn(styles.errorWrapper, props.className)} theme={'body-3'}>
      {props.children}
    </Text>
  )
}
