import React, { useContext, useRef, useState } from 'react'
import { randomNumber } from '@coxy/utils'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { AppStore } from 'src/store'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { AccountLayout } from 'src/components/app/account-layout'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { ToastContext } from 'src/components/common/toast/context'
import { useApi } from 'src/utils/use/use-api'
import { useAppSelector } from 'src/store/hooks'
import { selectedAccount } from 'src/store/reducers/account'
import { saveAccountSignature } from 'src/store/reducers/account/actions/profile'
import { fontsSignatures } from 'src/components/app/document-view-component/components/edit-tools/fonts'
import { DrawSignatureModal } from 'src/components/app/document-view-component/components/edit-tools/draw-signature-modal'
import { fileToSignatureDataUrl } from 'src/components/app/document-view-component/components/edit-tools/signature-image'
import { requireAccountAuth } from 'src/utils/account-guard'

import styles from './styles.module.css'

const fonts = Object.keys(fontsSignatures)

type PendingSignature = { signImage?: string; signFont?: string }

export function AccountSignaturePage() {
  const { title } = usePageHead({ title: '| My signature' })
  const toast = useContext(ToastContext)
  const account = useAppSelector(selectedAccount)

  const [pending, setPending] = useState<PendingSignature | null>(null)
  const [isDrawOpen, setIsDrawOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [save, { isLoading }] = useApi(saveAccountSignature)

  const current: PendingSignature = pending ?? {
    signImage: account?.signImage ?? undefined,
    signFont: account?.signFont ?? undefined,
  }

  const handleGenerate = useEvent(() => {
    setPending({ signFont: fonts[randomNumber(0, fonts.length - 1)] })
  })

  const handleUpload = useEvent(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const signImage = await fileToSignatureDataUrl(file)
      setPending({ signImage })
    } catch {
      toast.addToast({ text: 'Unsupported image. Use a PNG or JPEG file.' })
    }
  })

  const handleDrawSave = useEvent((signImage: string) => {
    setPending({ signImage })
    setIsDrawOpen(false)
  })

  const handleSave = useEvent(async () => {
    if (!pending) return

    const result = await save(pending)
    if (result) {
      setPending(null)
      toast.addToast({ text: 'Successfully saved', type: 'success' })
    }
  })

  return (
    <>
      <PageHead>{title}</PageHead>

      <div className={styles.wrapper}>
        <div className={styles.preview}>
          {current.signImage && <img src={current.signImage} alt='Signature' className={styles.previewImage} />}
          {!current.signImage && current.signFont && (
            <div className={current.signFont} style={{ fontSize: 48, lineHeight: '120%' }}>
              {account?.name}
            </div>
          )}
          {!current.signImage && !current.signFont && (
            <Text theme='body-1' className='color-text-secondary'>
              You don’t have a signature yet. Draw, upload or generate one below.
            </Text>
          )}
        </div>

        <div className={styles.saveRow}>
          <Button theme='dark' size='sm' onClick={handleSave} isLoading={isLoading} disabled={!pending}>
            Save
          </Button>
        </div>

        <Space size={8} />
        <div className={styles.actions}>
          <Button onClick={() => setIsDrawOpen(true)} className={styles.actionButton}>
            Draw signature
          </Button>
          <Button onClick={() => fileInputRef.current?.click()} className={styles.actionButton}>
            Upload signature
          </Button>
          <Button onClick={handleGenerate} className={styles.actionButton}>
            Generate signature
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type='file'
          accept='image/png,image/jpeg'
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
      </div>

      <DrawSignatureModal visible={isDrawOpen} onClose={() => setIsDrawOpen(false)} onSave={handleDrawSave} />
    </>
  )
}

AccountSignaturePage.getInitialProps = async (context, store: AppStore) => {
  requireAccountAuth(context, store)
  return {}
}


AccountSignaturePage.getLayout = AccountLayout
