import { useEffect, useState } from 'react'

export function useIsInViewportPartially(id: string, isLoading: boolean) {
  const [isInViewport, setIsInViewport] = useState(false)
  const offsetTop = 200
  const offsetBottom = offsetTop - 26

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id)
      const rect = element?.getBoundingClientRect()
      const isTopElementLessThanOffsetTop = rect?.top <= offsetTop
      const isBottomElementMoreThanZero = rect?.top + rect?.height - offsetBottom > 0

      const isView = isTopElementLessThanOffsetTop && isBottomElementMoreThanZero

      setIsInViewport(isView)
    }
    if (!isLoading) {
      handleScroll()
    }

    if (!isLoading) {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isLoading])

  return isInViewport
}

export function useIsInViewport(id: string, isOpen: boolean) {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id)
      const rect = element?.getBoundingClientRect()
      const html = document.documentElement
      const isInViewFully =
        rect?.top >= 0 &&
        rect?.left >= 0 &&
        rect?.bottom <= (window.innerHeight || html.clientHeight) &&
        rect?.right <= (window.innerWidth || html.clientWidth)

      setIsInViewport(isInViewFully)
    }
    if (isOpen) {
      handleScroll()
    }

    if (isOpen) {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isOpen])

  return isInViewport
}
