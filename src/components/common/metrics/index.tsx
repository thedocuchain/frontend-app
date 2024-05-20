import Script from 'next/script'

export function Metrics() {
  if (process?.env?.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Global site tag (GTM.js) - Google Analytics */}
      <Script async src='https://www.googletagmanager.com/ns.html?id=GTM-NJ9VNHWK' strategy='lazyOnload' />

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
        })(window,document,'script','dataLayer','GTM-NJ9VNHWK');
      `}
      </Script>

      {/* Global site tag (GTM.js) - Google Analytics */}
    </>
  )
}
