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

// Gate a page behind auth, sending unauthenticated users to sign up and
// returning them to `returnTo` (a client-side path, e.g. /doc/<id>) afterwards.
export function requireAccountAuthReturn(
  context: NextPageContext,
  store: Store,
  returnTo: string,
): boolean {
  const token = selectedAccountToken(store.getState())
  if (token) {
    return true
  }

  const target = `/register?redirect=${encodeURIComponent(returnTo)}`
  if (context.res) {
    context.res.writeHead(302, { Location: `/app${target}` })
    context.res.end()
  } else {
    void Router.replace(target)
  }

  return false
}
