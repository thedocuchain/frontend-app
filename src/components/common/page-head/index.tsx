import Head from 'next/head'

export function usePageHead({ title }) {
  return {
    title: `DocuChain ${title}`,
  }
}

export function PageHead(props: { children: JSX.Element | string }): JSX.Element {
  return (
    <Head>
      <title>{props.children}</title>
    </Head>
  )
}

export function PageMeta(props: { children: JSX.Element | string }): JSX.Element {
  return <Head>{props.children}</Head>
}

export function PageDescription(props: { children: string }): JSX.Element {
  return (
    <Head>
      <meta name='description' content={props.children}></meta>
    </Head>
  )
}
