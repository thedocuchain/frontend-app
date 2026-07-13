export interface Toast {
  uuid: string
  text: string
  type?: 'success'
  isHidden?: boolean
  timeout?: number
}
