import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import ReactGA from "react-ga";

import "../styles/globals.css";

ReactGA.initialize("G-4M24160CZH");
ReactGA.pageview(window.location.pathname + window.location.search);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
