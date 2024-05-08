import React, { PropsWithChildren, ReactElement, useEffect, useState, useRef } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

export type PositionTypes = 'top' | 'right' | 'left' | 'bottom'

export interface TooltipProps extends PropsWithChildren {
  content?: string | ReactElement
  width?: number
  maxWidth?: number
  height?: number
  isNoWrap?: boolean
  position?: PositionTypes
  isShow?: boolean
  isError?: boolean
}

export const Tooltip = (props: TooltipProps): ReactElement => {
  const [visible, setVisible] = useState(false)
  const [timerHide, setTimer] = useState<number | undefined>(undefined)
  const [leftPosition, setLeftPosition] = useState(0)
  const [topPosition, setTopPosition] = useState(0)
  const wrapper = useRef<HTMLDivElement>()
  const tooltip = useRef<HTMLDivElement>()
  const isShow = props.isShow !== false

  useEffect(() => () => window.clearTimeout(timerHide), [])

  const showTooltip = () => {
    if (props.content) {
      setVisible(true)
      window.clearTimeout(timerHide)
    }
  }

  useEffect(() => {
    if (wrapper.current && tooltip.current) {
      const wrapperWidth = wrapper.current.clientWidth
      const tooltipWidth = tooltip.current.clientWidth

      setLeftPosition(tooltipWidth / 2 - wrapperWidth / 2)

      const wrapperHeight = wrapper.current.clientHeight
      const tooltipHeight = tooltip.current.clientHeight

      setTopPosition(wrapperHeight / 2 - tooltipHeight / 2)
    }
  }, [wrapper, visible])

  useEffect(() => {
    if (props.isError) {
      setVisible(true)
    }
  }, [props.isError])

  const hideTooltip = () => {
    if (props.isError) return
    setTimer(window.setTimeout(() => setVisible(false), 50))
  }

  if (!props.children) {
    return props.children as ReactElement
  }

  return (
    <div className='relative pointer' ref={wrapper} style={{ height: props.height }}>
      {React.Children.map(
        props.children,
        (child: ReactElement) =>
          child &&
          React.cloneElement(child, {
            onMouseEnter: showTooltip,
            onMouseLeave: hideTooltip,
          }),
      )}

      {visible && isShow && props.position === 'top' && (
        <div
          ref={tooltip}
          className={cn(styles.tooltipTop, { [styles.nowrap]: props.isNoWrap, [styles.tooltipError]: props.isError })}
          style={{ minWidth: props.width, maxWidth: props.maxWidth, left: `-${leftPosition}px` }}
        >
          {props.content}
        </div>
      )}
      {visible && isShow && props.position === 'right' && (
        <div
          ref={tooltip}
          className={cn(styles.tooltipRight, { [styles.nowrap]: props.isNoWrap, [styles.tooltipError]: props.isError })}
          style={{ minWidth: props.width, maxWidth: props.maxWidth, top: `${topPosition}px` }}
        >
          {props.content}
        </div>
      )}
      {visible && isShow && props.position === 'left' && (
        <div
          ref={tooltip}
          className={cn(styles.tooltipLeft, { [styles.nowrap]: props.isNoWrap, [styles.tooltipError]: props.isError })}
          style={{ minWidth: props.width, maxWidth: props.maxWidth, top: `${topPosition}px` }}
        >
          {props.content}
        </div>
      )}
      {visible && isShow && (props.position === 'bottom' || props.position === undefined) && (
        <div
          ref={tooltip}
          className={cn(styles.tooltipBottom, {
            [styles.nowrap]: props.isNoWrap,
            [styles.tooltipError]: props.isError,
          })}
          style={{ minWidth: props.width, maxWidth: props.maxWidth, left: `-${leftPosition}px` }}
        >
          {props.content}
        </div>
      )}
    </div>
  )
}
