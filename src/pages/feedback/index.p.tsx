import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { GradientBg } from 'src/components/ui/gradient-bg'
import { Text } from 'src/components/ui/typography'
import { IconClose } from 'src/icons'
import { RowBetween } from 'src/components/ui/grid'
import { InputValidatorField } from 'src/components/ui/input-wrapper'
import { Textarea } from 'src/components/ui/textarea'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { Input } from 'src/components/ui/input'
import { Button } from 'src/components/ui/button'
import { ToastContext } from 'src/components/common/toast/context'
import { useApi } from 'src/utils/use/use-api'
import { sendFeedback } from 'src/store/reducers/document/actions/send-feedback'
import { EmptyState } from 'src/components/ui/empty-state'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'

import styles from './styles.module.css'

export default function FeedbackPage() {
  const { title } = usePageHead({ title: '| Feedback form' })
  const router = useRouter()
  const rules = useValidatorRules()
  const toast = useContext(ToastContext)
  const [isSuccessSent, setIsSuccessSent] = useState(false)
  const [send, { isSuccess, isLoading }] = useApi(sendFeedback)
  const documentId = useAppSelector(selectedDocument)?.id

  const [form, setValue] = useStateForm({
    email: '',
    name: '',
    message: '',
  })
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(form)

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessSent(true)
    }
  }, [isSuccess])

  const handleBack = useEvent(() => {
    if (documentId) {
      void router.push(`/doc/${documentId}`)
      return
    }
    router.back()
  })

  const handleSend = useEvent(async () => {
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

    await send({
      email: form.email,
      name: form.name,
      message: form.message,
    })
  })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Header isTransparent />
        <GradientBg>
          <div className={styles.wrapper}>
            {isSuccessSent ? (
              <div className={styles.form}>
                <RowBetween>
                  <div />
                  <IconClose onClick={handleBack} className='on-click' />
                </RowBetween>
                <div className={styles.empty}>
                  <EmptyState type={'success-send-feedback'} onClick={handleBack} className={styles.emptyBlock} />
                </div>
              </div>
            ) : (
              <div className={styles.form}>
                <div className={styles.innerForm}>
                  <RowBetween>
                    <Text theme={'link-1'}>Give app feedback</Text>
                    <IconClose onClick={handleBack} className='on-click' />
                  </RowBetween>

                  <Text theme={'body-1'} className={styles.description}>
                    Please describe what you’d like to improve. Your feedback helps our service to become better.
                  </Text>

                  <ValidatorWrapper ref={validator}>
                    <div className={styles.rowBlock}>
                      <InputValidatorField required rules={rules.name} value={form.name} isVisibleErrors={isShowError}>
                        <Input
                          label={'Your name'}
                          placeholder='John Doe'
                          value={form.name}
                          onChange={setValue('name')}
                        />
                      </InputValidatorField>

                      <InputValidatorField
                        required
                        rules={rules.email}
                        value={form.email}
                        isVisibleErrors={isShowError}
                      >
                        <Input
                          label={'Email'}
                          placeholder='john.doe@gmail.com'
                          value={form.email}
                          onChange={setValue('email')}
                        />
                      </InputValidatorField>
                    </div>

                    <InputValidatorField
                      required
                      rules={rules.message}
                      value={form.message}
                      isVisibleErrors={isShowError}
                    >
                      <Textarea
                        label={'Message'}
                        placeholder='Enter feedback'
                        value={form.message}
                        onChange={setValue('message')}
                      />
                    </InputValidatorField>
                  </ValidatorWrapper>
                </div>

                <div className={styles.buttonWrapper}>
                  <Button theme='secondary' size='sm' onClick={handleBack}>
                    Cancel
                  </Button>
                  <Button isLoading={isLoading} theme='primary' size='sm' onClick={handleSend}>
                    Send message
                  </Button>
                </div>
              </div>
            )}
          </div>
        </GradientBg>
      </PageWrapper>
    </>
  )
}
