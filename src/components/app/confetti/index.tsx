import React from 'react'
import Confetti from 'react-confetti-boom'

import { useIsMobile } from 'src/utils/use/use-is-mobile'

export function ConfettiComponent() {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile && (
        <Confetti
          mode='boom'
          x={0}
          y={1}
          deg={270}
          colors={['#87D4FF', '#FA8178', '#F9DB72', '#9FE870']}
          launchSpeed={4}
          effectCount={1}
          spreadDeg={60}
          particleCount={2000}
          shapeSize={12}
        />
      )}

      {!isMobile && (
        <Confetti
          mode='boom'
          x={0.5}
          y={1}
          deg={0}
          colors={['#87D4FF', '#FA8178', '#F9DB72', '#9FE870']}
          launchSpeed={5}
          effectCount={1}
          spreadDeg={360}
          particleCount={6000}
          shapeSize={16}
        />
      )}
    </>
  )
}
