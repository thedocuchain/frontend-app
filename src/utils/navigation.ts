export const handleOpenLink = (url: string) => {
  if (!url.startsWith('http')) {
    // eslint-disable-next-line no-param-reassign
    url = `https://${url}`
  }

  window.open(url, '_blank').focus()
}
