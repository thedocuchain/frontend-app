import { useEffect, useState } from 'react'

export function useIsInViewportPartially(id: string) {
  const [isInViewport, setIsInViewport] = useState(false)
  const offsetTop = 200
  const offsetBottom = 10

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id)
      const rect = element?.getBoundingClientRect()
      const html = document.documentElement

      const isView = rect?.top <= offsetTop && rect?.top - offsetBottom >= -(window.innerHeight || html.clientHeight)

      setIsInViewport(isView)
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isInViewport
}

export function useIsInViewport(id: string) {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id)
      const rect = element?.getBoundingClientRect()
      const html = document.documentElement

      const isView =
        rect?.top >= 0 &&
        rect?.left >= 0 &&
        rect?.bottom <= (window.innerHeight || html.clientHeight) &&
        rect?.right <= (window.innerWidth || html.clientWidth)

      setIsInViewport(isView)
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isInViewport
}
