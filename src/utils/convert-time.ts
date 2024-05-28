import { formatDistanceStrict } from 'date-fns'

export const isMoreThan24HoursString = (date: string): string | boolean => {
  const minutes = formatDistanceStrict(new Date(date), new Date(), {
    addSuffix: false,
    unit: 'minute',
    roundingMethod: 'floor',
  }).split(' ')[0]

  const hours = Math.floor(+minutes / 60)
  const min = +minutes - hours * 60
  const isShowHours = min === 0 ? 24 - hours > 0 : 23 - hours > 0

  if (+minutes >= 1440) {
    return false
  }
  if (isShowHours && min) {
    return `You can remind in ${23 - hours}h ${60 - min}min`
  }
  if (!isShowHours && min) {
    return `You can remind in ${60 - min}min`
  }
  if (!min && isShowHours) {
    return `You can remind in ${24 - hours}h`
  }
}

export function toIsoString(date) {
  const tzo = -date.getTimezoneOffset()
  const dif = tzo >= 0 ? '+' : '-'
  const pad = function (num) {
    return (num < 10 ? '0' : '') + num
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}${dif}${pad(Math.floor(Math.abs(tzo) / 60))}:${pad(Math.abs(tzo) % 60)}`
}
