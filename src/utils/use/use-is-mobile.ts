import { useEffect, useState } from 'react'

const elRootId = '__next'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const mobileWidth = 640

  const handleResize = () => {
    setIsMobile(document.documentElement.clientWidth < mobileWidth)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const root = document.getElementById(elRootId)

    if (!root) {
      return
    }

    setIsMobile(document.documentElement.clientWidth < mobileWidth)

    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [])

  return isMobile
}
