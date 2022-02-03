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
`;

export default MyApp;
