const MAX_WIDTH = 800
const MAX_HEIGHT = 400

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image'))
    image.src = src
  })
}

export async function fileToSignatureDataUrl(file: File): Promise<string> {
  const objectUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(objectUrl)

    if (!image.naturalWidth || !image.naturalHeight) {
      throw new Error('Image has no dimensions')
    }

    const scale = Math.min(1, MAX_WIDTH / image.naturalWidth, MAX_HEIGHT / image.naturalHeight)
    const width = Math.max(1, Math.round(image.naturalWidth * scale))
    const height = Math.max(1, Math.round(image.naturalHeight * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    const isPng = file.type === 'image/png'

    if (!isPng) {
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)
    }

    context.drawImage(image, 0, 0, width, height)

    if (isPng) {
      const dataUrl = canvas.toDataURL('image/png')
      if (dataUrl.length <= 1_500_000) return dataUrl

      context.globalCompositeOperation = 'destination-over'
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)
    }

    return canvas.toDataURL('image/jpeg', 0.85)
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}
