import React from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { useRouter } from 'next/router'

import { Column, Flex, Row } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { IconDocumentSent, IconDocumentSigned } from 'src/icons'
import { Button } from 'src/components/ui/button'
import { RateUs } from 'src/components/app/rate-us'
import { Share } from 'src/components/app/share'
import { documentMock } from 'src/pages/document-status-page/data'

import styles from './styles.module.css'

export function SuccessStatusComponent(props: { isAllSigned?: boolean; isSend?: boolean }): JSX.Element {
  const { isAllSigned, isSend } = props
  const isOneSigned = !isAllSigned && !isSend
  const router = useRouter()

  const document = documentMock
  const checkId = document.id
  const documentName = document.name

  const handleNewDocument = useEvent(() => {
    void router.push('/')
  })

  const handleCheckStatus = useEvent(() => {
    void router.push(`/?searchId=${checkId}`)
  })

  const handleViewDocument = useEvent(() => {
    void router.push(`/`)
  })

  const handleDownload = useEvent(() => {
    void router.push(`/`)
  })

  const handleDetails = useEvent(() => {
    void router.push(`/`)
  })

  return (
    <Flex flex='1' className={styles.bg}>
      <Column className={cn(styles.wrapper, 'column-center')}>
        {isSend && (
          <>
            <IconDocumentSent className={styles.icon} />
            <Text theme={'headline-2'}>Document sent successfully!</Text>
            <Text theme={'body-2'} className={styles.desc}>
              Your document has been dispatched, and all participants have received an email invitation to sign it. You
              will be notified as soon as any participant signs or takes action on the document.
            </Text>

            <Row className={styles.buttonsContainer}>
              <Button theme='secondary' className={styles.button} onClick={handleNewDocument}>
                New document
              </Button>
              <Button theme='primary' className={styles.button} onClick={handleCheckStatus}>
                Check status
              </Button>
            </Row>
          </>
        )}

        {isAllSigned && (
          <>
            <IconDocumentSigned className={styles.icon} />
            <Text theme={'headline-2'} className={styles.name}>
              {/* eslint-disable-next-line no-irregular-whitespace */}
              {documentName} has been signed! 🔥 🔥 🔥
            </Text>
            <Text theme={'body-2'} className={styles.desc}>
              All participants sign your document and received a notification with the link to the file. Now, you can
              download the signed PDF version of the document. The link expires in 30 days.
            </Text>

            <Row className={styles.buttonsContainer}>
              <Button theme='secondary' className={styles.button} onClick={handleDetails}>
                See details
              </Button>
              <Button theme='primary' className={styles.button} onClick={handleDownload}>
                Download
              </Button>
            </Row>
          </>
        )}

        {isOneSigned && (
          <>
            <IconDocumentSigned className={styles.icon} />
            <Text theme={'headline-2'}>You’ve successfully signed the document!</Text>
            <Text theme={'body-2'} className={styles.desc}>
              We’re waiting for others to sign. We’ll notify you once all participants have taken action. We’ll email
              all participants a copy after the document is signed.
            </Text>

            <Row className={styles.buttonsContainer}>
              <Button theme='secondary' className={styles.button} onClick={handleViewDocument}>
                View document
              </Button>
              <Button theme='primary' className={styles.button} onClick={handleCheckStatus}>
                Check status
              </Button>
            </Row>
          </>
        )}

        {isAllSigned && (
          <div className={styles.space}>
            <Share />
          </div>
        )}

        {isOneSigned && (
          <div className={styles.space}>
            <RateUs />
          </div>
        )}
      </Column>
    </Flex>
  )
}
