export function trimBySize(str: string, max: number): string {
  return str.length > max ? str.substring(0, max) : str
}

export function nameToIcon(_name: string): string {
  if (!_name) return _name

  const name = _name.trim()
  const splitName = name.split(' ')
  if (splitName.length > 1) {
    return splitName[0].slice(0, 1) + splitName[1].slice(0, 1)
  }
  return name.slice(0, 2)
}
