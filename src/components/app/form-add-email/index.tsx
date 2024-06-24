import React, { useContext } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'

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

  const [form, setValue, clear] = useStateForm({
    email: '',
  })
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(form)
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

    const isDuplicateEmail = document.users.some((el) => el.email === form.email)
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

    await subscribe({ documentId: document.id, userEmail: form.email })
    clear()
  })

  return (
    <div className={props.isSendScreen ? styles.formSendScreen : styles.form}>
      <ValidatorWrapper ref={validator}>
        <InputValidatorField
          id={'email'}
          required
          rules={rules.email}
          value={form.email}
          isVisibleErrors={isShowError}
          className={styles.formWrapper}
        >
          <Input
            onEnter={handleSubmitForm}
            isEmail
            value={form.email}
            onChange={setValue('email')}
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
