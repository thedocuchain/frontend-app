export { preformatFloat } from '@coxy/utils'

export const formatPercent = (str: string | number): string => {
  if (Number(str) < 0.01 && Number(str) !== 0) {
    return '< 0.01'
  }
  return Number(str).toFixed(2)
}

export function numberRange(value, min, max) {
  return Math.min(Math.max(Number(value), min), max)
}

export function nFormatter(num, digits = 4) {
  const lookup = [
    { value: 1e21, symbol: '' },
    { value: 1e23, symbol: '' },
    { value: 1e27, symbol: '' },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })

  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : Number(num).toFixed(digits)
}

export function toK(value: unknown) {
  if (Math.abs(Number(value)) > 999) {
    if (Math.abs(Number(value)) > 1000000) {
      return `${Math.round(Number(value) / 1000 / 1000)}kk`
    }
    return `${Math.round(Number(value) / 1000)}k`
  }
  return Number(value).toFixed(2)
}

export function kFormatter(num: unknown) {
  if (Math.abs(Number(num)) > 999) {
    if (Math.abs(Number(num)) > 1000000) {
      return `${Math.round(Number(num) / 1000 / 1000)}kk`
    }
    return `${Math.abs(Number(num) / 1000).toFixed(1)}k`
  }
  return Number(num).toFixed(1)
}

export function dataForUnrealizedPnlPercent(value: number) {
  if (isNaN(value * 100)) return 'n/a'
  if (value * 100 > 1000) return `${toK(value * 100).toUpperCase()}%`
  return `${parseFloat((value * 100).toFixed(2))}%`
}
