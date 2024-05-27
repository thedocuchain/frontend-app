import React from 'react'
import cn from 'classnames'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { useRouter } from 'next/router'

import { Column, Row } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { RateUs } from 'src/components/app/rate-us'
import { Share } from 'src/components/app/share'
import { AppLink } from 'src/components/ui/app-link'
import { IconExpired, IconPlaneColor, IconSuccessfullySigned } from 'src/icons'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { GradientBg } from 'src/components/ui/gradient-bg'

import Image404Mobile from './images/404-image-mobile.png'
import Image404 from './images/404-image-desktop.png'
import styles from './styles.module.css'

export function StatusScreenTemplate(props: {
  isAllSigned?: boolean
  isOneSigned?: boolean
  isSend?: boolean
  is404Page?: boolean
  isServerErrorPage?: boolean
  isExpired?: boolean
  setCheckStatusPage?: () => void
  setDocumentViewPage?: () => void
}): JSX.Element {
  const {
    isAllSigned,
    isOneSigned,
    is404Page,
    isServerErrorPage,
    isSend,
    isExpired,
    setCheckStatusPage,
    setDocumentViewPage,
  } = props
  const router = useRouter()

  const document = useAppSelector(selectedDocument)
  const checkId = document.id
  const documentName = document.name

  const handleNewDocument = useEvent(() => {
    void router.push('/')
  })

  const handleCheckStatus = useEvent(() => {
    if (setCheckStatusPage) {
      setCheckStatusPage()
      return
    }
    void router.push(`/doc/${checkId}`)
  })

  const handleViewDocument = useEvent(() => {
    if (setDocumentViewPage) {
      setDocumentViewPage()
    }
  })

  const handleDownload = useEvent(() => {
    // ...
  })

  return (
    <>
      <GradientBg>
        <Column
          className={cn(styles.wrapper, 'column-center', {
            [styles.wrapperOneSigned]: isOneSigned,
            [styles.wrapper404]: is404Page || isServerErrorPage,
          })}
        >
          {isServerErrorPage && (
            <>
              <img src={Image404Mobile.src} width={184} className={''} alt='' />

              <Text theme='display-text' header='h1' className={styles.name}>
                Server Error
              </Text>

              <Text theme='body-1' className={cn(styles.desc, 'color-text-secondary text-center')}>
                But don&apos;t worry, try refreshing the page later
              </Text>

              <Row className={styles.buttonsContainer}>
                <Button href='/' className={styles.buttonHome}>
                  Refresh
                </Button>
              </Row>
            </>
          )}

          {is404Page && (
            <>
              <img src={Image404Mobile.src} width={184} className={styles.imgMobile} alt='' />
              <img src={Image404.src} width={720} className={styles.img} alt='' />

              <Text theme='display-text' header='h1' className={styles.name}>
                Page not found
              </Text>

              <Text theme='body-1' className={cn(styles.desc, 'color-text-secondary text-center')}>
                Allow us to point you in a different direction.
              </Text>

              <Row className={styles.buttonsContainer}>
                <Button href='/' className={styles.buttonHome}>
                  Take me home
                </Button>
              </Row>
            </>
          )}

          {isSend && (
            <>
              <IconPlaneColor className={styles.iconPlane} />
              <Text theme={'display-text'} className={styles.name}>
                {documentName}
              </Text>
              <Text theme={'script-text'} className={styles.scriptText}>
                sent successfully
              </Text>
              <Text theme={'body-1'} className={styles.desc}>
                Your document has been dispatched, and all participants have received an email invitation to sign it.
                You will be notified as soon as any participant signs or takes action on the document.
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

          {isOneSigned && (
            <>
              <IconSuccessfullySigned className={styles.iconSuccessfullySigned} />
              <Text theme={'display-text'} className={styles.name}>
                You’ve successfully
              </Text>
              <Text theme={'script-text'} className={styles.scriptText}>
                signed the document
              </Text>
              <Text theme={'body-1'} className={styles.desc}>
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

          {isExpired && (
            <>
              <IconExpired className={styles.iconExpired} />

              <Text theme={'display-text'} className={styles.name}>
                Expired signing link
              </Text>
              <Text theme={'body-1'} className={styles.desc}>
                For your security, our links are time-limited. Protecting your data is our top priority. A new link has
                been sent to your email. Please check your inbox to continue signing the document.
              </Text>

              <Row className={styles.buttonsContainer}>
                <Button theme='primary' className={styles.buttonHome} onClick={handleNewDocument}>
                  Back to home
                </Button>
              </Row>
            </>
          )}

          {isAllSigned && (
            <>
              <IconSuccessfullySigned className={styles.iconSuccessfullySigned} />

              <Text theme={'display-text'} className={styles.name}>
                {documentName}
              </Text>
              <Text theme={'script-text'} className={styles.scriptText}>
                has been signed
              </Text>
              <Text theme={'body-1'} className={styles.desc}>
                All participants sign your document and received a notification with the link to the file. Now, you can
                download the signed PDF version of the document. The link expires in 30 days.
              </Text>

              <Row className={styles.buttonsContainer}>
                <Button theme='secondary' className={styles.button} onClick={handleCheckStatus}>
                  More details
                </Button>
                <Button theme='primary' className={styles.button} onClick={handleDownload}>
                  Download
                </Button>
              </Row>
            </>
          )}
        </Column>

        {(isSend || isAllSigned) && (
          <div className={styles.shareBlock}>
            <Share />
          </div>
        )}

        {isOneSigned && (
          <div className={styles.rateBlock}>
            <RateUs />
          </div>
        )}

        {(isExpired || isOneSigned) && (
          <div className={styles.footer}>
            <Text theme={'body-3'} className={'color-text-secondary'}>
              Want to send a document like this one?
            </Text>
            <AppLink href={'/'} theme={'primary'} className='underline-hover'>
              Check out DocuChain.
            </AppLink>
          </div>
        )}
      </GradientBg>
    </>
  )
}
