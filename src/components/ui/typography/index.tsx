import type { ReactElement, PropsWithChildren } from 'react'

import cn from 'classnames'
import React from 'react'

import styles from './styles.module.css'

type TitleProps = PropsWithChildren & {
  theme:
    | 'display-text'
    | 'button-big'
    | 'button-sm'
    | 'button-standard'
    | 'body-1'
    | 'body-2'
    | 'body-3'
    | 'headline-1'
    | 'headline-2'
    | 'headline-3'
    | 'headline-4'
    | 'headline-5'
    | 'label-1'
    | 'label-2'
    | 'label-3'
    | 'menu-text'
    | 'link-1'
    | 'link-2'
    | 'link-3'
    | 'script-text'
  header?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  style?: React.CSSProperties
}

export function Text(props: TitleProps): ReactElement {
  const { theme, style, header } = props

  const className = cn(
    styles.text,
    {
      [styles.displayText]: theme === 'display-text',
      [styles.buttonBig]: theme === 'button-big',
      [styles.buttonSm]: theme === 'button-sm',
      [styles.buttonStandard]: theme === 'button-standard',
      [styles.body1]: theme === 'body-1',
      [styles.body2]: theme === 'body-2',
      [styles.body3]: theme === 'body-3',
      [styles.headline1]: theme === 'headline-1',
      [styles.headline2]: theme === 'headline-2',
      [styles.headline3]: theme === 'headline-3',
      [styles.headline4]: theme === 'headline-4',
      [styles.headline5]: theme === 'headline-5',
      [styles.label1]: theme === 'label-1',
      [styles.label2]: theme === 'label-2',
      [styles.label3]: theme === 'label-3',
      [styles.menuText]: theme === 'menu-text',
      [styles.link1]: theme === 'link-1',
      [styles.link2]: theme === 'link-2',
      [styles.link3]: theme === 'link-3',
      [styles.scriptText]: theme === 'script-text',
    },
    props.className,
  )

  if (header === 'h1') return <h1 className={className}>{props.children}</h1>
  if (header === 'h2') return <h2 className={className}>{props.children}</h2>
  if (header === 'h3') return <h3 className={className}>{props.children}</h3>
  if (header === 'h4') return <h4 className={className}>{props.children}</h4>

  return (
    <div style={style} className={className}>
      {props.children}
    </div>
  )
}
