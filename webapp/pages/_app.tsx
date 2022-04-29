import React from "react";

import "@/theme/global.css";
import type { AppProps } from "next/app";

const BasePage = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default BasePage;
