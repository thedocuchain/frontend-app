import { useEffect, useRef, useState } from 'react'

const TICK_MS = 25
const CATCH_UP_DIVISOR = 50

const storageKey = (reviewId: string) => `docuchain-ai-review-progress-${reviewId}`

function readProgress(reviewId: string): number {
  const saved = Number(sessionStorage.getItem(storageKey(reviewId)))
  return Number.isFinite(saved) && saved > 0 ? saved : 0
}

// Position is kept in sessionStorage so leaving mid-review and coming back
// resumes typing where it stopped instead of replaying or skipping ahead.
export function useTypewriter(reviewId: string | null, content: string, isPlaying: boolean) {
  const [visibleCount, setVisibleCount] = useState(0)
  const isRestored = useRef(false)

  useEffect(() => {
    if (!reviewId || isRestored.current) return
    isRestored.current = true
    setVisibleCount(readProgress(reviewId))
  }, [reviewId])

  useEffect(() => {
    if (!reviewId || !isRestored.current) return
    if (!isPlaying || visibleCount >= content.length) return

    const timer = setInterval(() => {
      setVisibleCount((current) => {
        if (current >= content.length) return current
        const step = Math.max(2, Math.ceil((content.length - current) / CATCH_UP_DIVISOR))
        return Math.min(content.length, current + step)
      })
    }, TICK_MS)

    return () => clearInterval(timer)
  }, [reviewId, content.length, isPlaying, visibleCount])

  useEffect(() => {
    if (!reviewId || !isRestored.current) return
    sessionStorage.setItem(storageKey(reviewId), String(visibleCount))
  }, [reviewId, visibleCount])

  return {
    visibleText: content.slice(0, visibleCount),
    isTyping: visibleCount < content.length,
  }
}
