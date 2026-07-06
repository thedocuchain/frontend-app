import { NextPageContext } from 'next'
import Router from 'next/router'
import { Store } from '@reduxjs/toolkit'

import { selectedAccountToken } from 'src/store/reducers/auth'

export function requireAccountAuth(context: NextPageContext, store: Store): boolean {
  const token = selectedAccountToken(store.getState())
  if (token) {
    return true
  }

  if (context.res) {
    context.res.writeHead(302, { Location: '/app/login' })
    context.res.end()
  } else {
    void Router.replace('/login')
  }

  return false
}
