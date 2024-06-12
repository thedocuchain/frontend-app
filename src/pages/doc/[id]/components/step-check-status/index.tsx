import React, { useContext, useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'

import { Header } from 'src/components/app/header'
import { Column, Flex } from 'src/components/ui/grid'
import { AppTable } from 'src/components/app/app-table'
import { Footer } from 'src/components/app/footer'
import { DocumentPreview } from 'src/components/app/document-preview'
import { Text } from 'src/components/ui/typography'
import { StepsProgressBar } from 'src/components/app/steps-progress-bar'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconEye } from 'src/icons'
import { Space } from 'src/components/ui/space'
import { Alert } from 'src/components/ui/alert'
import { Input } from 'src/components/ui/input'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { subscribeUser } from 'src/store/reducers/document/actions/subscribe'
import { useApi } from 'src/utils/use/use-api'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { ToastContext } from 'src/components/common/toast/context'
import { InputSuccess } from 'src/components/ui/input-success'
import { DocumentStatuses } from 'src/store/reducers/document/types'

import styles from './styles.module.css'

export function StepCheckStatus() {
  const [subscribe, { isSuccess, isLoading }] = useApi(subscribeUser)
  const toast = useContext(ToastContext)
  const document = useAppSelector(selectedDocument)
  const users = document.users
  const signers = users.filter((el) => el.role === 'signer')
  const signedBy = `Signed by ${signers.filter((el) => el.signatures[0]?.signed).length} of ${signers.length}`
  const valueSigners = (signers.filter((el) => el.signatures[0]?.signed).length / signers.length) * 100
  const steps = [
    {
      title: 'Document uploaded',
      value: 100,
    },
    {
      title: 'Sent to participants',
      value: 100,
    },
    {
      title: signedBy,
      value: valueSigners === 0 ? 5 : valueSigners,
    },
    {
      title: 'Completed',
      value: 0,
    },
  ]

  useEffect(() => {
    if (document.status === DocumentStatuses.SENT) {
      setActiveStep('Sent to participants')
    }
    if (
      document.status === DocumentStatuses.COMPLETED ||
      document.status === DocumentStatuses.SIGNED ||
      document.status === DocumentStatuses.BLOCKCHAINED
    ) {
      setActiveStep('Completed')
    }
    if (document.status === DocumentStatuses.PARTIALLY_SIGNED || document.status === DocumentStatuses.DELIVERED) {
      setActiveStep(signedBy)
    }
  }, [document.status])

  const [activeStep, setActiveStep] = useState(signedBy)
  const isCompleted = activeStep === 'Completed'

  const [form, setValue] = useStateForm({
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
  })

  const handleViewDocument = useEvent(() => {
    window.open(`/app/doc/${document.id}?view=true`, '_blank')
  })

  return (
    <>
      <Header />
      <Flex flex='1' className={styles.bg}>
        <div className={styles.wrapper}>
          <Column className={styles.firstColumn}>
            <DocumentPreview document={document} />
            <Space size={16} />
            <Button theme='secondary' size={'sm'} className={'w100-p'} onClick={handleViewDocument}>
              <ButtonIcon>
                <IconEye />
              </ButtonIcon>
              View document
            </Button>
          </Column>
          <Column className={styles.secondColumn}>
            <Text theme={'headline-1'} className={styles.name}>
              {document.name}
            </Text>

            {isCompleted && (
              <div className={styles.containerDone}>
                <Text theme='label-2' className={'color-text-accent'}>
                  Signing completed
                </Text>
              </div>
            )}

            <div className='show-mobile'>
              <DocumentPreview document={document} />
            </div>

            <StepsProgressBar steps={steps} activeStep={activeStep} />

            <div className='show-mobile'>
              <Space size={24} />
              <Button theme='secondary' className={'w100-p'} onClick={handleViewDocument}>
                <ButtonIcon>
                  <IconEye />
                </ButtonIcon>
                View document
              </Button>
            </div>

            {!isCompleted && (
              <Alert title='Enter your email to receive updates on the signing process.' className={styles.alert}>
                <div className={styles.form}>
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
                        id={'email'}
                        isEmail
                        value={form.email}
                        onChange={setValue('email')}
                        placeholder={'john.doe@gmail.com'}
                      />
                      <InputSuccess isVisibleSuccess={isSuccess}>
                        You’ve successfully subscribed to updates!
                      </InputSuccess>
                    </InputValidatorField>
                    <Button
                      isLoading={isLoading}
                      onClick={handleSubmitForm}
                      theme='secondary'
                      className={styles.button}
                    >
                      Confirm
                    </Button>
                  </ValidatorWrapper>
                </div>
              </Alert>
            )}

            <Text theme={'headline-2'} className={styles.titleSecondary}>
              Signing status
            </Text>
            <AppTable participants={users} />

            <div className='hide-mobile'>
              <Space size={76} />
            </div>
          </Column>
        </div>
      </Flex>

      <Footer />
    </>
  )
}
