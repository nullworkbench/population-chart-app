import type { AppProps } from "next/app";
import "@/styles/globals.scss";

import Title from "@/components/ui/Title";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Title />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
