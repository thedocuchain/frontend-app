import React, { useContext, useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Textarea } from 'src/components/ui/textarea'
import { Space } from 'src/components/ui/space'
import { ToastContext } from 'src/components/common/toast/context'
import { IconClose } from 'src/icons'
import { useAppDispatch } from 'src/store/hooks'
import { sendSupportTicket } from 'src/store/reducers/account/actions/profile'
import { ApiErrorPayload } from 'src/store/reducers/account/actions/api-error'

import styles from './styles.module.css'

type SupportModalProps = {
  visible: boolean
  onClose: () => void
}

export function SupportModal(props: SupportModalProps) {
  const { visible, onClose } = props
  const dispatch = useAppDispatch()
  const toast = useContext(ToastContext)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (visible) {
      setTitle('')
      setText('')
      setError('')
    }
  }, [visible])

  const handleSend = useEvent(async () => {
    setError('')
    if (!title.trim() || !text.trim()) {
      setError('Fill in the title and describe your problem')
      return
    }

    setIsLoading(true)
    const result = await dispatch(sendSupportTicket({ title: title.trim(), text: text.trim() }))
    setIsLoading(false)

    if (sendSupportTicket.fulfilled.match(result)) {
      toast.addToast({ text: 'Your request has been sent' })
      onClose()
      return
    }
    setError((result.payload as ApiErrorPayload)?.message ?? 'Something went wrong. Please try again.')
  })

  return (
    <Modal visible={visible} onClose={onClose} className={styles.modalCard}>
      <div className={styles.closeRow}>
        <IconClose className='on-click' onClick={onClose} />
      </div>

      <Text theme='headline-4' header='h2' className={styles.title}>
        Support Ticket
      </Text>
      <Space size={16} />

      <Input label='Title' placeholder='What is your request about?' value={title} onChange={setTitle} />
      <Space size={12} />
      <Textarea
        label='Text'
        placeholder='Describe your problem'
        rows={5}
        className={styles.ticketText}
        value={text}
        onChange={setText}
      />

      {error && (
        <>
          <Space size={12} />
          <Text theme='body-3' className='color-text-error'>
            {error}
          </Text>
        </>
      )}

      <Space size={20} />
      <Button onClick={handleSend} isLoading={isLoading} className={styles.button}>
        Send
      </Button>
    </Modal>
  )
}
