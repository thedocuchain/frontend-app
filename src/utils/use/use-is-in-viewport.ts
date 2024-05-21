import { useEffect, useState } from 'react'

export function useIsInViewport(id: string) {
  const [isInViewport, setIsInViewport] = useState(false)
  const offset = id.split('_')[1] === '1' ? 200 : 340

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id)
      const rect = element?.getBoundingClientRect()
      const html = document.documentElement

      const isView = rect?.top <= offset && rect?.top >= -(window.innerHeight || html.clientHeight)

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
