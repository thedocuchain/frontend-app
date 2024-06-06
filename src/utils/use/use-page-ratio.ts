import { useEffect, useState } from 'react'

export const usePageRatio = (isLoading: boolean, pageWidth: number) => {
  const [pageRatio, setPageRatio] = useState(1)
  const [right, setRight] = useState(0)

  const handleSetRight = () => {
    const pageWidthElement = document.getElementById('page_1')?.clientWidth
    const participantWrapper = document.getElementById('participant-wrapper')
    const rect = participantWrapper?.getBoundingClientRect()

    if (pageRatio === 1) {
      setRight(0)
      return
    }
    setRight((pageWidthElement - rect?.width) / 2)
  }

  const handleSetCalculatedPageRatio = () => {
    const pageWidthCalculated = document.getElementById('page_1')?.clientWidth
    const pageRatioCalculated = pageWidthCalculated / 780

    if (pageRatioCalculated > 0 && pageRatioCalculated < 1) {
      setPageRatio(pageRatioCalculated)
    }

    if (pageRatioCalculated >= 1 || pageRatioCalculated <= 0) {
      setPageRatio(1)
    }
  }

  useEffect(() => {
    handleSetRight()
  }, [pageRatio])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    handleSetCalculatedPageRatio()

    window.addEventListener('resize', handleSetCalculatedPageRatio, false)

    return () => {
      window.removeEventListener('resize', handleSetCalculatedPageRatio, false)
    }
  }, [isLoading, pageWidth])

  return [pageRatio, right]
}
