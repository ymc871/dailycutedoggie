import '../styles/globals.css';
import Head from 'next/head';
import 'flowbite';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Daily Cute Doggie</title>
                <meta name="description" content="Your daily cute doggie" />
                <link rel="icon" href="/favicon.svg" />

                {/* GTM */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-TF3DQCG');
                    `,
                    }}
                />
            </Head>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
