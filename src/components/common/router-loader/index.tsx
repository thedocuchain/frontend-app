import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { Hydrated } from 'src/components/common/hydrated'

import styles from './styles.module.css'

export function RouterLoader() {
  const router = useRouter()
  const [isStart, setIsStart] = useState(false)

  const handleStart = () => {
    setIsStart(true)
  }

  const handleStop = () => {
    setIsStart(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  })

  return (
    <Hydrated>
      <div className={styles.loader}>
        <span className={cn({ [styles.isStart]: isStart })}></span>
      </div>
    </Hydrated>
  )
}
