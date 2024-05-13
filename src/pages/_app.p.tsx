import type { ApiDispatch } from 'src/store'

import { AppContext, AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { getCookies } from 'cookies-next'
import Head from 'next/head'
import { Store } from '@reduxjs/toolkit'
import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { ErrorBoundary } from 'src/components/common/error-boundary'
import { __setApiStore } from 'src/store/apis'
import { createLocalStore } from 'src/store/store'
import { CookiesPayload } from 'src/store/constants'
import { hydrateCookies } from 'src/store/actions/hydrate'
import { I18nWrapper } from 'src/components/common/i18n-wrapper'
import 'src/styles/globals.css'
import { RouterLoader } from 'src/components/common/router-loader'
import { Metrics } from 'src/components/common/metrics'
import { Toasts, ToastsProvider } from 'src/components/common/toast'

// suppress useLayoutEffect warnings when running outside a browser
if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect

// const requiredAuth = []
// const redirectIfAuthorized = ['/auth/signup', '/auth/signin']

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  initialState: Store
}

function RenderLayoutComponent(props) {
  const GetLayout = props.Component.getLayout ?? ((page) => page)

  if (props.Component.getLayout) {
    return (
      <GetLayout>
        <props.Component {...props.pageProps} />
      </GetLayout>
    )
  }

  return <props.Component {...props.pageProps} />
}

export default function MyCustomApp({ Component, pageProps, initialState }: AppPropsWithLayout) {
  const store = createLocalStore(initialState)

  return (
    <ErrorBoundary>
      <Head>
        <meta charSet='utf-8' />
        <title>DocuChain</title>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='color-scheme' content='only light' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'true'} />
      </Head>
      <Provider store={store}>
        <Metrics />
        <RouterLoader />
        <I18nWrapper>
          <ToastsProvider>
            <RenderLayoutComponent Component={Component} pageProps={pageProps} />
            <Toasts />
          </ToastsProvider>
        </I18nWrapper>
      </Provider>
    </ErrorBoundary>
  )
}

MyCustomApp.getInitialProps = async (context: AppContext) => {
  const store = createLocalStore({})
  __setApiStore(store)

  const isServer = !!context.ctx.res
  const dispatch = store.dispatch as ApiDispatch

  let cookies
  if (isServer) {
    cookies = getCookies({
      req: context.ctx.req,
      res: context.ctx.res,
    })
    await dispatch(hydrateCookies(cookies as CookiesPayload))
  } else {
    cookies = getCookies()
  }

  // const token = selectedAccessToken(store.getState())
  //
  // // login if token found
  // if (token && isServer) {
  //   await dispatch(getUser())
  //   const user = selectedUser(store.getState())
  //
  //   if (user) {
  //     await Promise.all([
  //       dispatch(setUserIsLogin(true)),
  //       // dispatch(getWorkCalendarList()),
  //       // dispatch(getIntegrationList()),
  //       // dispatch(getGoogleCalendarList()),
  //     ])
  //   }
  // }
  //
  // // only for backend
  // if (isServer) {
  //   const isLogin = selectedIsUserLogin(store.getState())
  //
  //   if (!isLogin) {
  //     requiredAuth.forEach((item) => {
  //       if (context.router.pathname.includes(item)) {
  //         ;[CookiesTokens.accessToken].forEach((token) => {
  //           deleteCookie(token, {
  //             req: context.ctx.req,
  //             res: context.ctx.res,
  //           })
  //         })
  //
  //         context.ctx.res.writeHead(302, { Location: '/' })
  //         context.ctx.res.end()
  //       }
  //     })
  //   }
  //   // } else {
  //   // redirectIfAuthorized.forEach((item) => {
  //   //   if (context.router.pathname.includes(item)) {
  //   //     context.ctx.res.writeHead(302, { Location: `/${user?.username}` })
  //   //     context.ctx.res.end()
  //   //   }
  //   // })
  //   // }
  // }

  let pageProps = {}
  if (context.Component.getInitialProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pageProps = await context.Component.getInitialProps(context.ctx, store)
  }

  const initialState = store.getState()
  return { cookies, initialState, pageProps }
}
