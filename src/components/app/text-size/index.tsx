import React, { PropsWithChildren, useEffect } from 'react'

import { getInnerText } from 'src/utils/react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedFontSize, setFontSize } from 'src/store/reducers/signature'

type ComponentProps = {
  maxLen: number
  minSize?: number
  className?: string
}

export const calculateFontSizeByLength = (value: string, { minSize, maxLen }: ComponentProps) => {
  const len = String(value).trim().length
  const defaultSize = 20
  const proportion = maxLen / len
  const size = defaultSize * Math.min(proportion, 1)

  return Math.ceil(Math.max(size, minSize || 0))
}

export function TextSize({
  children,
  maxLen,
  className,
  minSize,
  style,
  ...props
}: PropsWithChildren<ComponentProps> & {
  style?: React.CSSProperties
}) {
  const fontSize = calculateFontSizeByLength(getInnerText(children), { maxLen, className, minSize })
  const dispatch = useAppDispatch()
  const fs = useAppSelector(selectedFontSize)

  useEffect(() => {
    if (fontSize !== fs) {
      dispatch(setFontSize(fontSize))
    }
  }, [fontSize])

  return (
    <span {...props} style={style} className={className}>
      {children}
    </span>
  )
}
