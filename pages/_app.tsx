import "../styles/globals.css";

import "../styles/Search.less";

import "antd-mobile/bundle/css-vars-patch.css";

import type { AppProps } from "next/app";

import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
