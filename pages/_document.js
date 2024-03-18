import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    let GTAG = process.env.GOOGLETAG;
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date()); 
                gtag('config', '${GTAG}' , {
                  page_path: windows.location.pathname,
                });
              `,
            }}
          />
          <Script
            lazyOnload
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8408011024891440"
            crossorigin="anonymous"
          ></Script>

          {/* <!--  Hotjar Tracking Code for https://www.apneehatti.com/ --> */}

          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:'3544787',hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
          <Script
            lazyOnload
            async
            src="https://connect.facebook.net/en_US/fbevents.js"
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              fbq('init', '250396180909149');
              fbq('track', 'PageView');
            `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=250396180909149&ev=PageView&noscript=1"
            />
          </noscript>

          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&family=Ultra&display=swap"
            rel="stylesheet"
          ></link>
          <meta charset="UTF-8" />

          <meta
            name="Description"
            content="Apneehatti is an online shopping platform of Himachal Pradesh You can Buy - Handmade items, 100% Natural Skin Care Products, Organic Food, Handlooms & Crafts"
          />
          <meta
            http-equiv="Content-type"
            content="text/html; charset=utf-8"
          ></meta>
          <meta name="robots" content="noodp"></meta>
          <meta property="og:type" content="website"></meta>
          <meta
            name="og_site_name"
            property="og:site_name"
            content="apneehatti.com"
          ></meta>
          <meta
            name="og_title"
            property="og:title"
            content="Discover a wide range of high-quality products at competitive prices. Shop now for the latest fashion, electronics, home decor, and more. Enjoy fast shipping and excellent customer service"
          ></meta>
          <meta
            property="og:description"
            content="Apneehatti is an online shopping platform of Himachal Pradesh You can Buy - Handmade items, 100% Natural Skin Care Products, Organic Food, Handlooms & Crafts"
          ></meta>
          <meta
            name="og_url"
            property="og:url"
            content="https://www.apneehatti.com"
          ></meta>
          <meta
            name="Keywords"
            content="Online Shopping in India,Online Shopping Site,Buy Online,Online Shopping,Apneehatti,Apneehatti,apneehatti,
            Apneehatti website,
            Apneehatti online,
            Apneehatti shop,
            Apneehatti products,
            Apneehatti store,
            Apneehatti marketplace,
            Buy from Apneehatti,
            Apneehatti reviews,
            Apneehatti deals,"
          ></meta>
          <link rel="canonical" href="https://www.apneehatti.com"></link>
          <Script src="/node_modules/flowbite/js/flowbite.js" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
