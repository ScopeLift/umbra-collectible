import { AppProps } from "next/app";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, configureChains, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { MerkleProvider } from "../contexts/MerkleContext";
import { ContractClientProvider } from "../contexts/ContractClientContext";
import { networks } from "../utils/networks";
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

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={appInfo} chains={chains}>
          <ContractClientProvider networks={networks}>
            <MerkleProvider>
              <Component {...pageProps} />
            </MerkleProvider>
          </ContractClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default CustomApp;
