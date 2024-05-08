export function copyToClipboard(str) {
  try {
    void window.navigator.clipboard.writeText(str)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.textContent = String(str)
    textarea.style.position = 'fixed'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
    } catch (ignore) {
      // ignore
    } finally {
      document.body.removeChild(textarea)
    }
  }
}
