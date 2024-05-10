import React from 'react'
import cn from 'classnames'

import { nameToIcon } from 'src/utils/strings'
import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

const colors = [
  '#444CE7',
  '#0086C9',
  '#099250',
  '#3E4784',
  '#E62E05',
  '#BA24D5',
  '#155EEF',
  '#088AB2',
  '#CA8504',
  '#E31B54',
  '#6938EF',
  '#1570EF',
  '#0E9384',
  '#4F7A21',
  '#E04F16',
  '#DD2590',
  '#7839EE',
  '#0086C9',
]

const colorsText = [
  '#353DD4',
  '#0079B5',
  '#027D42',
  '#303870',
  '#D12600',
  '#A819C2',
  '#0B51DB',
  '#00799E',
  '#B56A00',
  '#CF1147',
  '#592ADB',
  '#0B62DB',
  '#088072',
  '#406617',
  '#CC420C',
  '#C91A80',
  '#682BD9',
  '#0079B5',
]

export function Avatar(props: { name: string; index: number; className?: string }) {
  const { name, className } = props
  // todo index for large lists
  const index = props.index >= 18 ? props.index - 18 : props.index

  const cl = cn(styles.avatar, className)

  const colorText = colorsText[index]
  const colorBorder = colors[index]

  return (
    <div className={cl} style={{ backgroundColor: `${colorBorder}08`, border: `1px solid ${colorBorder}` }}>
      <Text theme='label-2' className='uppercase' style={{ color: colorText }}>
        {nameToIcon(name)}
      </Text>
    </div>
  )
}
