import { useCallback, useState } from 'react'

export function useTogglePopup(defaultValue = false): [boolean, () => void, () => void] {
  const [isVisible, setToggle] = useState(defaultValue)
  const open = useCallback(() => setToggle(true), [])

  const close = useCallback(() => {
    const popup = document.getElementById('popup')
    const popupWrapper = document.getElementById('popupWrapper')

    if (popup && popupWrapper) {
      popup.classList.add('slide-out-popup')
      popupWrapper.classList.add('fade-out-popup')

      setTimeout(() => {
        popup.classList.remove('slide-out-popup')
        popupWrapper.classList.remove('fade-out-popup')
        setToggle(false)
      }, 200)
    }
  }, [])

  return [isVisible, open, close]
}
