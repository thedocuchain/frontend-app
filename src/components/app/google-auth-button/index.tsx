import React from 'react'

import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconGoogle } from 'src/icons'
import { BASE_URL } from 'src/store/apis/rest'

import styles from './styles.module.css'

type GoogleAuthButtonProps = {
  label: string
  redirect?: string | null
}

export function GoogleAuthButton({ label, redirect }: GoogleAuthButtonProps) {
  const handleClick = () => {
    const base = BASE_URL.replace(/\/$/, '')
    const query = redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''
    window.location.href = `${base}/v1/auth/google${query}`
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}>or</div>
      <Button theme='secondary' onClick={handleClick} className={styles.button}>
        <ButtonIcon>
          <IconGoogle />
        </ButtonIcon>
        {label}
      </Button>
    </div>
  )
}
