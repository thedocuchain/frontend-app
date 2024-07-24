import Script from 'next/script'
import React from 'react'

export function Metrics() {
  if (process?.env?.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Amplitude script */}
      <Script id='amplitude' type='text/javascript'>
        {`!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var r=0;r<y.length;r++)o(e,y[r],!0)};r.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.crossOrigin="anonymous",a.src="https://cdn.amplitude.com/libs/plugin-ga-events-forwarder-browser-0.2.0-min.js.gz",a.onload=function(){e.gaEventsForwarder&&e.gaEventsForwarder.plugin&&e.amplitude.add(e.gaEventsForwarder.plugin())};var c=t.createElement("script");c.type="text/javascript",c.integrity="sha384-HpnlFSsUOQTaqmMKb6/PqZKVOBEpRji3JNLr81x6XElQ4bkquzRyG/F8rY8IDMuw",c.crossOrigin="anonymous",c.async=!0,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.2.1-min.js.gz",c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(a,u),u.parentNode.insertBefore(c,u);for(var p=function(){return this._q=[],this},d=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<d.length;l++)n(p,d[l]);r.Identify=p;for(var g=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(g,v[f]);r.Revenue=g;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],y=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(e){return r._iq[e]={_q:[]},i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

            amplitude.init('f0bcba2df0c4f0823d0919a67f4cf609');`}
      </Script>

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
