export function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (window && document) {
      const script = document.createElement('script')
      const body = document.getElementsByTagName('body')[0]
      script.src = src
      body.appendChild(script)
      script.addEventListener('load', () => {
        resolve()
      })
    }
  })
}
