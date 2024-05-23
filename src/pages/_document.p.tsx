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
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={''} />
          <link
            href='https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allison&family=Allura&family=Annie+Use+Your+Telescope&family=Architects+Daughter&family=Arizonia&family=Bad+Script&family=Briem+Hand:wght@100..900&family=Butterfly+Kids&family=Calligraffitti&family=Caveat:wght@400..700&family=Cedarville+Cursive&family=Charm:wght@400;700&family=Charmonman:wght@400;700&family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Coming+Soon&family=Cookie&family=Courgette&family=Covered+By+Your+Grace&family=Crafty+Girls&family=Dancing+Script:wght@400..700&family=Dawning+of+a+New+Day&family=Dekko&family=Delicious+Handrawn&family=Edu+SA+Beginner:wght@400..700&family=Engagement&family=Ephesis&family=Estonia&family=Euphoria+Script&family=Fasthand&family=Give+You+Glory&family=Gloria+Hallelujah&family=Grand+Hotel&family=Great+Vibes&family=Grechen+Fuemen&family=Handlee&family=Herr+Von+Muellerhoff&family=Homemade+Apple&family=Hurricane&family=Indie+Flower&family=Italianno&family=Julee&family=Just+Another+Hand&family=Just+Me+Again+Down+Here&family=Kalam:wght@300;400;700&family=Kaushan+Script&family=Kolker+Brush&family=Kristi&family=La+Belle+Aurore&family=League+Script&family=Licorice&family=Liu+Jian+Mao+Cao&family=Long+Cang&family=Love+Ya+Like+A+Sister&family=Marck+Script&family=Meddon&family=MedievalSharp&family=Meow+Script&family=Merienda:wght@300..900&family=Miniver&family=Montez&family=Moon+Dance&family=Mr+Dafoe&family=Mrs+Saint+Delafield&family=Ms+Madi&family=Nanum+Brush+Script&family=Nanum+Pen+Script&family=Neonderthaw&family=Neucha&family=Nothing+You+Could+Do&family=Oooh+Baby&family=Over+the+Rainbow&family=Pacifico&family=Parisienne&family=Pinyon+Script&family=Playball&family=Qwigley&family=Qwitcher+Grypen:wght@400;700&family=Rancho&family=Reenie+Beanie&family=Rochester&family=Rock+Salt&family=Sacramento&family=Satisfy&family=Schoolbell&family=Seaweed+Script&family=Shadows+Into+Light&family=Shadows+Into+Light+Two&family=Shalimar&family=Smooch&family=Square+Peg&family=Stalemate&family=Sue+Ellen+Francisco&family=Sunshiney&family=Swanky+and+Moo+Moo&family=Tangerine:wght@400;700&family=Vujahday+Script&family=Waiting+for+the+Sunrise&family=Yellowtail&family=Zeyada&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
