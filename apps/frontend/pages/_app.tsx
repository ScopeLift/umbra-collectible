import { AppProps } from "next/app";
import Head from "next/head";
import merge from "lodash.merge";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import styled, { ThemeProvider } from "styled-components";
import { chain, createClient, configureChains, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { MerkleProvider } from "../contexts/MerkleContext";
import { ContractClientProvider } from "../contexts/ContractClientContext";
import { networks } from "../utils/networks";
import { theme } from "../utils/theme";
import GlobalStyle from "../utils/globalStyles";
const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" && [
      chain.rinkeby,
      chain.goerli,
      chain.foundry,
      chain.polygonMumbai,
    ]),
  ],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY }), publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "Umbra collectible airdrop",
  chains,
});

const appInfo = {
  appName: "Umbra Collectilble airdrop",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [wallet.argent({ chains }), wallet.trust({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const connectTheme = merge(lightTheme(), {
  colors: {
    accentColor: theme.colors.primary,
  },
  fonts: {
    body: theme.fonts.fontFamily,
  },
} as Theme);

const Layout = styled.div`
  display: grid;
  margin: 1.6rem 1.6rem 0 1.6rem;
  grid-template:
    ". header ." 9.6rem
    ". body ." 80vh
    ". footer ." auto / 1fr minmax(auto, 102.3rem) 1fr;
`;

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Umbra Grant NFT</title>
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={appInfo}
          chains={chains}
          theme={connectTheme}
        >
          <ContractClientProvider networks={networks}>
            <MerkleProvider>
              <ThemeProvider theme={theme}>
                <Layout>
                  <Header />
                  <Component {...pageProps} />
                  <Footer />
                </Layout>
              </ThemeProvider>
              <GlobalStyle />
            </MerkleProvider>
          </ContractClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
