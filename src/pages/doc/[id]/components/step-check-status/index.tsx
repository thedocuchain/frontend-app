import React, { useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Header } from 'src/components/app/header'
import { Column, Flex } from 'src/components/ui/grid'
import { AppTable } from 'src/components/app/app-table'
import { DocumentPreview } from 'src/components/app/document-preview'
import { Text } from 'src/components/ui/typography'
import { StepsProgressBar } from 'src/components/app/steps-progress-bar'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconDownload, IconEye } from 'src/icons'
import { Space } from 'src/components/ui/space'
import { Alert } from 'src/components/ui/alert'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { DocumentStatuses } from 'src/store/reducers/document/types'
import { FormAddEmail } from 'src/components/app/form-add-email'
import { downloadDocument } from 'src/store/reducers/document/actions/files'

import styles from './styles.module.css'

export function StepCheckStatus() {
  const document = useAppSelector(selectedDocument)
  const dispatch = useAppDispatch()
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

  const handleViewDocument = useEvent(() => {
    window.open(`/app/doc/${document.id}?view=true`, '_blank')
  })

  const handleDownload = useEvent(async () => {
    const response = await dispatch(downloadDocument({ id: document.id })).unwrap()

    if (response?.fileLink) {
      window.open(response.fileLink)
    }
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

            {isCompleted && (
              <>
                <Space size={8} />

                <Button theme='primary' size={'sm'} className={'w100-p'} onClick={handleDownload}>
                  <ButtonIcon>
                    <IconDownload />
                  </ButtonIcon>
                  Download
                </Button>
              </>
            )}
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
              {isCompleted && (
                <>
                  <Space size={8} />

                  <Button theme='primary' className={'w100-p'} onClick={handleDownload}>
                    <ButtonIcon>
                      <IconDownload />
                    </ButtonIcon>
                    Download
                  </Button>
                </>
              )}
            </div>

            {!isCompleted && (
              <Alert title='Enter your email to receive updates on the signing process.' className={styles.alert}>
                <FormAddEmail />
              </Alert>
            )}

            <Text theme={'headline-2'} className={styles.titleSecondary}>
              Signing status
            </Text>
            <AppTable participants={users} />

            <div className={styles.space} />
          </Column>
        </div>
      </Flex>
    </>
  )
}
