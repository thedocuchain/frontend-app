import React, { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { ValidatorField } from '@coxy/react-validator'
import cn from 'classnames'

import styles from './styles.module.css'

type ValidatorFieldType = Parameters<typeof ValidatorField>[0] & { isVisibleErrors: boolean }

export function InputValidatorField(props: ValidatorFieldType) {
  return (
    <ValidatorField {...props}>
      {({ isValid, message }) => (
        <div className={styles.wrapperInput}>
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
  return <div className={cn(styles.errorWrapper, props.className)}>{props.children}</div>
}
