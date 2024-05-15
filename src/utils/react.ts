import { PropsWithChildren, ReactNode } from 'react'

export function getInnerText(obj: ReactNode): string {
  let buf = ''
  if (!obj) {
    return buf
  }

  const type = typeof obj
  if (type === 'string' || type === 'number') {
    buf += obj
  } else if (type === 'object') {
    let children = null
    if (Array.isArray(obj)) {
      children = obj
    } else {
      const props = (obj as { props: PropsWithChildren }).props
      if (props) {
        children = props.children
      }
    }
    if (children) {
      if (Array.isArray(children)) {
        children.forEach(function (o) {
          buf += getInnerText(o)
        })
      } else {
        buf += getInnerText(children)
      }
    }
  }

  return buf
}
