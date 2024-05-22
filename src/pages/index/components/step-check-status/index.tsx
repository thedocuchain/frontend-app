import React, { useContext } from 'react'
import { useStateForm } from '@coxy/utils/dist/use/use-state-form'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { ValidatorWrapper } from '@coxy/react-validator'
import { useRouter } from 'next/router'

import { UploadCardBg } from 'src/components/app/upload-card-bg'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { ToastContext } from 'src/components/common/toast/context'
import { useValidatorRules } from 'src/utils/use/use-validator-rules'
import { useFormValidator } from 'src/utils/use/use-form-validator'
import { InputValidatorField } from 'src/components/ui/input-wrapper'

import styles from './styles.module.css'

export function StepCheckStatus(): JSX.Element {
  const toast = useContext(ToastContext)
  const rules = useValidatorRules()
  const router = useRouter()
  const queryCheckId = router.query.searchId as string

  const [form, setValue] = useStateForm({
    id: queryCheckId || '',
  })
  const [validator, validate, isShowError, setIsShowError] = useFormValidator(form)

  const handleCheckStatus = useEvent(async () => {
    setIsShowError(false)
    const { isValid, message } = validate()

    if (!isValid) {
      setIsShowError(true)

      toast.addToast({
        text: message,
      })
    }
  })

  return (
    <>
      <Text theme={'display-text'}>Check status by ID</Text>
      <div className='hide-mobile'>
        <Space size={16} />
      </div>
      <div className='show-mobile-mobile'>
        <Space size={4} />
      </div>
      <Text theme={'body-1'} className={styles.text}>
        Enter your document ID to get the status.
      </Text>
      <div className='hide-mobile'>
        <Space size={44} />
      </div>

      <div className='show-mobile-mobile'>
        <Space size={32} />
      </div>

      <UploadCardBg className={styles.cardWrapper}>
        <div className={styles.row}>
          {/* todo fix */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <ValidatorWrapper ref={validator}>
            <InputValidatorField required rules={rules.id} value={form.id} isVisibleErrors={isShowError}>
              <Input
                isSearch
                onEnter={handleCheckStatus}
                placeholder='Enter ID'
                value={form.id}
                onChange={setValue('id')}
              />
            </InputValidatorField>
          </ValidatorWrapper>

          <Button onClick={handleCheckStatus} theme={'primary'} className={styles.button}>
            Check status
          </Button>
        </div>
      </UploadCardBg>
    </>
  )
}
