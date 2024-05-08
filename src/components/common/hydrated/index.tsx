import { useEffect, useState } from 'react'

export const Hydrated = (props) => {
  const [hydration, setHydration] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true)
    }
  }, [])
  return hydration ? props.children : null
}
