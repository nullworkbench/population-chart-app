import type { AppProps } from "next/app";
import styled from "styled-components";
import "@/styles/globals.scss";

import Title from "@/components/ui/Title";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Title />
      <Component {...pageProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "ヒラギノ角ゴシック",
    "Hiragino Sans", YuGothic, "Yu Gothic", "Source Sans Pro", "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
`;

export default MyApp;
