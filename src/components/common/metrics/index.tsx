import Script from 'next/script'
import React from 'react'

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export function Metrics() {
  if (process?.env?.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {AMPLITUDE_API_KEY && (
        <>
          <Script src='https://cdn.amplitude.com/libs/analytics-browser-2.7.4-min.js.gz'></Script>
          <Script src='https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.6.8-min.js.gz'></Script>
          <Script src='https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz'></Script>
          <Script id='amplitude' strategy='lazyOnload'>
            {`window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1})).promise.then(function() {window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());window.amplitude.init('${AMPLITUDE_API_KEY}');});`}
          </Script>
        </>
      )}

      {GTM_ID && (
        <>
          <Script async src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} strategy='lazyOnload' />

          <Script id='google-analytics-gtag' strategy='lazyOnload'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '');
          `}
          </Script>

          <Script id='google-analytics-gtm' strategy='lazyOnload'>
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
          </Script>
        </>
      )}
    </>
  )
}
