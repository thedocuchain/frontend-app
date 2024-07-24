import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from 'react'
import Script from 'next/script'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <Script id='amplitude'>
            {`!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e._q.push({name:t,args:Array.prototype.slice.call(r,0)})},i=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))};o(e,t,Array.prototype.slice.call(arguments))}},a=function(e){for(var t=0;t<g.length;t++)i(e,g[t],!1);for(var r=0;r<m.length;r++)i(e,m[r],!0)};r.invoked=!0;var c=t.createElement("script");c.type="text/javascript",c.integrity="sha384-BHj/6N+ZSiRDYRUHPEqr/nwkUsSk3s9r1ryQeFBc4x2OiVz4peW3jSccKZsoU8Ry",c.crossOrigin="anonymous",c.async=!0,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.6.2-beta.0-min.js.gz",c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(c,u);for(var l=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],d=0;d<p.length;d++)n(l,p[d]);r.Identify=l;for(var f=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],y=0;y<v.length;y++)n(f,v[y]);r.Revenue=f;var g=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],m=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];a(r),r.createInstance=function(e){return r._iq[e]={_q:[]},a(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

            amplitude.init('f0bcba2df0c4f0823d0919a67f4cf609');`}
          </Script>

          <link rel='preload' href='/app/fonts/AlexBrush-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Allison-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Allura-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/AnnieUseYourTelescope-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/app/fonts/ArchitectsDaughter-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Arizonia-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/BadScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/BriemHand-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/ButterflyKids-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Calligraffitti-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Caveat-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/CedarvilleCursive-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Charm-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Charmonman-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/ComicNeue-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/ComingSoon-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Cookie-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Courgette-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/CoveredByYourGrace-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/CraftyGirls-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/DancingScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/DawningofaNewDay-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Dekko-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/DeliciousHandrawn-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/app/fonts/EduSABeginner-VariableFont_wght.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Engagement-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Ephesis-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Estonia-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/EuphoriaScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Fasthand-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/GiveYouGlory-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/GloriaHallelujah-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/GrandHotel-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/GreatVibes-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/GrechenFuemen-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Handlee-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/HerrVonMuellerhoff-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/HomemadeApple-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Hurricane-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/IndieFlower-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Italianno-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Julee-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/JustAnotherHand-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/app/fonts/JustMeAgainDownHere-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Kalam-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/KaushanScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/KolkerBrush-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Kristi-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/LaBelleAurore-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/LeagueScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Licorice-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/LiuJianMaoCao-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/LongCang-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/LoveYaLikeASister-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/MarckScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Meddon-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/MedievalSharp-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/MeowScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Merienda-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Miniver-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Montez-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/MoonDance-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/MrDafoe-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/MrsSaintDelafield-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/MsMadi-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/NanumBrushScript-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/NanumPenScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Neonderthaw-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Neucha-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/NothingYouCouldDo-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/OoohBaby-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/OvertheRainbow-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Pacifico-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Parisienne-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/PinyonScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Playball-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Qwigley-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/QwitcherGrypen-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Rancho-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/ReenieBeanie-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Rochester-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/RockSalt-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Sacramento-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Satisfy-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Schoolbell-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/SeaweedScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/ShadowsIntoLight-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/app/fonts/ShadowsIntoLightTwo-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Shalimar-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Smooch-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/SquarePeg-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Stalemate-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/SueEllenFrancisco-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Sunshiney-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/SwankyandMooMoo-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Tangerine-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/VujahdayScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/app/fonts/WaitingfortheSunrise-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/app/fonts/Yellowtail-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/app/fonts/Zeyada-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
