import React, { useEffect, useRef, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { Modal } from 'src/components/ui/modal'
import { Button } from 'src/components/ui/button'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { IconClose, IconRefresh } from 'src/icons'

import styles from './styles.module.css'

export type DrawSignatureModalProps = {
  visible: boolean
  onClose: () => void
  onSave: (dataUrl: string) => void
}

const STROKE_COLOR = '#0d1629'
const STROKE_WIDTH = 3
const TRIM_PADDING = 8

function trimCanvasToDataUrl(canvas: HTMLCanvasElement): string | null {
  const context = canvas.getContext('2d')
  const { width, height } = canvas
  const pixels = context.getImageData(0, 0, width, height).data

  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] > 0) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  if (maxX < 0) return null

  minX = Math.max(0, minX - TRIM_PADDING)
  minY = Math.max(0, minY - TRIM_PADDING)
  maxX = Math.min(width - 1, maxX + TRIM_PADDING)
  maxY = Math.min(height - 1, maxY + TRIM_PADDING)

  const trimmed = document.createElement('canvas')
  trimmed.width = maxX - minX + 1
  trimmed.height = maxY - minY + 1
  trimmed.getContext('2d').drawImage(canvas, -minX, -minY)

  return trimmed.toDataURL('image/png')
}

export function DrawSignatureModal(props: DrawSignatureModalProps) {
  const { visible, onClose, onSave } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ratio = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio

    const context = canvas.getContext('2d')
    context.scale(ratio, ratio)
    context.lineWidth = STROKE_WIDTH
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = STROKE_COLOR
    setIsEmpty(true)
  }, [visible])

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ratio = window.devicePixelRatio || 1
    const scaleX = canvas.width / ratio / rect.width
    const scaleY = canvas.height / ratio / rect.height
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY }
  }

  const handlePointerDown = useEvent((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault()
    const canvas = canvasRef.current
    canvas.setPointerCapture(event.pointerId)
    isDrawingRef.current = true

    const { x, y } = getPoint(event)
    const context = canvas.getContext('2d')
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + 0.1, y)
    context.stroke()
    setIsEmpty(false)
  })

  const handlePointerMove = useEvent((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return
    event.preventDefault()

    const { x, y } = getPoint(event)
    const context = canvasRef.current.getContext('2d')
    context.lineTo(x, y)
    context.stroke()
  })

  const handlePointerUp = useEvent(() => {
    isDrawingRef.current = false
  })

  const handleTryAgain = useEvent(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    setIsEmpty(true)
  })

  const handleSave = useEvent(() => {
    const dataUrl = trimCanvasToDataUrl(canvasRef.current)
    if (!dataUrl) return
    onSave(dataUrl)
  })

  return (
    <Modal visible={visible} onClose={onClose} className={styles.modalCard}>
      <div className={styles.header}>
        <Text theme='headline-3'>Draw your signature below</Text>

        <button className={styles.closeButton} onClick={onClose} aria-label='Close'>
          <IconClose width={24} height={24} />
        </button>
      </div>

      <Space size={20} />

      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      <Space size={20} />

      <div className={styles.footer}>
        <Button size='sm' disabled={isEmpty} onClick={handleSave}>
          Save
        </Button>

        <button className={styles.tryAgain} onClick={handleTryAgain}>
          <IconRefresh width={16} height={16} className={styles.tryAgainIcon} />
          <Text theme='button-standard' className='color-link-default'>
            Try again
          </Text>
        </button>
      </div>
    </Modal>
  )
}
