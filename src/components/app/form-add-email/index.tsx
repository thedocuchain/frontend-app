import React, { useContext, useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { ValidatorWrapper } from '@coxy/react-validator'

import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { subscribeDocument } from 'src/store/reducers/document/actions/subscribe'
import { useApi } from 'src/utils/use/use-api'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { ToastContext } from 'src/components/common/toast/context'
import { InputSuccess } from 'src/components/ui/input-success'

import styles from './styles.module.css'

export function FormAddEmail(props: { isSendScreen?: boolean }) {
  const [subscribe, { isSuccess, isLoading }] = useApi(subscribeDocument)
  const toast = useContext(ToastContext)
  const document = useAppSelector(selectedDocument)

  const [email, setEmail] = useState('')
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(email)
  const rules = useValidatorRules()

  const handleSubmitForm = useEvent(async () => {
    const { isValid, message } = validate()

    if (validator.current) {
      validator.current.clearCustomErrors()
    }

    if (!isValid) {
      setIsShowError(true)

      toast.addToast({
        text: message,
      })

      return
    }

    const isDuplicateEmail = document.users.some((el) => el.email === email)
    if (isDuplicateEmail) {
      setIsShowError(true)
      await validator.current.setCustomError({
        id: 'email',
        message: 'You’ve already subscribed to updates.',
        isValid: false,
      })

      toast.addToast({
        text: 'You’ve already subscribed to updates.',
      })
      return
    }

    await subscribe({ documentId: document.id, userEmail: email })
  })

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setEmail(''), 2000)
    }
  }, [isSuccess])

  return (
    <div className={props.isSendScreen ? styles.formSendScreen : styles.form}>
      <ValidatorWrapper ref={validator}>
        <InputValidatorField
          id={'email'}
          required
          rules={rules.email}
          value={email}
          isVisibleErrors={isShowError}
          className={styles.formWrapper}
        >
          <Input
            onEnter={handleSubmitForm}
            isEmail
            value={email}
            onChange={setEmail}
            placeholder={'john.doe@gmail.com'}
          />
          <InputSuccess isVisibleSuccess={isSuccess}>You’ve successfully subscribed to updates!</InputSuccess>
        </InputValidatorField>
        <Button
          isLoading={isLoading}
          onClick={handleSubmitForm}
          theme='secondary'
          className={props.isSendScreen ? styles.buttonSendScreen : styles.button}
        >
          Confirm
        </Button>
      </ValidatorWrapper>
    </div>
  )
}
