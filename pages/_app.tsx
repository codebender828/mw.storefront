import "../styles/globals.css";

import "../styles/Search.less";

import "antd-mobile/bundle/css-vars-patch.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
