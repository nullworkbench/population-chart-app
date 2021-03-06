import type { AppProps } from "next/app";
import Head from "next/head";
import styled from "styled-components";
import "modern-css-reset/dist/reset.min.css"; // Reset CSS

import Title from "@/components/ui/Title";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Title */}
        <title>Population Chart</title>
        {/* description */}
        <meta
          name="description"
          content="日本の総人口推移を都道府県別にグラフ表示するアプリです！"
        />
        {/* favicon */}
        <link rel="icon" type="image/svg" href="/favicon.svg" />
      </Head>
      <Wrapper>
        <Title />
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  // size
  width: 90vw;
  max-width: 1000px;
  // spaces
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 8rem;
  // font
  font-family: -apple-system, BlinkMacSystemFont, "ヒラギノ角ゴシック",
    "Hiragino Sans", YuGothic, "Yu Gothic", "Source Sans Pro", "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
`;

export default MyApp;
