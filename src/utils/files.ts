export function isFormatAllowedFn(type: string): boolean {
  return (
    type === 'application/pdf' ||
    type === 'application/msword' ||
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
}
