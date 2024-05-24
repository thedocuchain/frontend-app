import React, { useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

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

import styles from './styles.module.css'

export function StepCheckStatus(): JSX.Element {
  const document = useAppSelector(selectedDocument)
  const users = document.users
  const signedBy = `Signed by ${document.users.filter((el) => el.signature?.signed).length} of ${document.users.length}`
  const valueSigners = (document.users.filter((el) => el.signature?.signed).length / document.users.length) * 100
  const steps = [
    {
      title: 'Document uploaded',
      value: 100,
    },
    {
      title: 'Sent to participants',
      value: document.status === 'signing' ? 100 : 0,
    },
    {
      title: signedBy,
      value: document.status === 'signing' ? valueSigners : 0,
    },
    {
      title: 'Completed',
      value: 0,
    },
  ]

  useEffect(() => {
    if (document.status === 'completed') {
      setActiveStep('Completed')
    }
    if (document.status === 'signing') {
      setActiveStep(signedBy)
    }
    if (document.status === 'uploaded') {
      setActiveStep('Document uploaded')
    }
  }, [document.status])

  const [activeStep, setActiveStep] = useState(signedBy)
  const isCompleted = activeStep === 'Completed'

  const [email, setEmail] = useState('')

  const handleSubmitForm = useEvent(() => {
    // ...
  })

  const handleViewDocument = useEvent(() => {
    window.open(`/doc/${document.id}?view=true`, '_blank')
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
                  <Input isEmail value={email} onChange={setEmail} placeholder={'john.doe@gmail.com'} />

                  <Button onClick={handleSubmitForm} theme='secondary' className={styles.button}>
                    Confirm
                  </Button>
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
