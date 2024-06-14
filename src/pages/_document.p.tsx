import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preload' href='/fonts/AlexBrush-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Allison-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Allura-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/fonts/AnnieUseYourTelescope-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/fonts/ArchitectsDaughter-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Arizonia-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/BadScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/BriemHand-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/ButterflyKids-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Calligraffitti-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Caveat-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/CedarvilleCursive-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Charm-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Charmonman-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/ComicNeue-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/ComingSoon-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Cookie-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Courgette-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/CoveredByYourGrace-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/CraftyGirls-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/DancingScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/DawningofaNewDay-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Dekko-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/DeliciousHandrawn-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/fonts/EduSABeginner-VariableFont_wght.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/fonts/Engagement-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Ephesis-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Estonia-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/EuphoriaScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Fasthand-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/GiveYouGlory-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/GloriaHallelujah-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/GrandHotel-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/GreatVibes-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/GrechenFuemen-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Handlee-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/HerrVonMuellerhoff-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/HomemadeApple-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Hurricane-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/IndieFlower-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Italianno-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Julee-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/JustAnotherHand-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/fonts/JustMeAgainDownHere-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/fonts/Kalam-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/KaushanScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/KolkerBrush-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Kristi-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/LaBelleAurore-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/LeagueScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Licorice-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/LiuJianMaoCao-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/LongCang-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/LoveYaLikeASister-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MarckScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Meddon-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MedievalSharp-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MeowScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Merienda-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Miniver-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Montez-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MoonDance-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MrDafoe-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MrsSaintDelafield-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/MsMadi-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/NanumBrushScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/NanumPenScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Neonderthaw-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Neucha-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/NothingYouCouldDo-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/OoohBaby-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/OvertheRainbow-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Pacifico-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Parisienne-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/PinyonScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Playball-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Qwigley-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/QwitcherGrypen-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Rancho-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/ReenieBeanie-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Rochester-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/RockSalt-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Sacramento-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Satisfy-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Schoolbell-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/SeaweedScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/ShadowsIntoLight-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/fonts/ShadowsIntoLightTwo-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/fonts/Shalimar-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Smooch-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/SquarePeg-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Stalemate-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/SueEllenFrancisco-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Sunshiney-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/SwankyandMooMoo-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Tangerine-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/VujahdayScript-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link
            rel='preload'
            href='/fonts/WaitingfortheSunrise-Regular.ttf'
            as='font'
            crossOrigin=''
            type='font/woff2'
          />
          <link rel='preload' href='/fonts/Yellowtail-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
          <link rel='preload' href='/fonts/Zeyada-Regular.ttf' as='font' crossOrigin='' type='font/woff2' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
