import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { useAccount, useNetwork } from "wagmi";

import { useMerkle } from "../contexts/MerkleContext";
import Button from "../components/Button";
import { useClaim } from "../hooks/useClaim";
import { networks } from "../utils/networks";
import { theme } from "../utils/theme";

const StyledPage = styled.div`
  grid-area: body;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  gap: 1.5rem;
`;

const StyledH1 = styled.h1`
  font-size: 2.5rem;

  @media ${({ theme }) => `${theme.devices.sm}`} {
    font-size: 3.2rem;
  }
`;

export function Index() {
  const [proof, setProof] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isClaimed, setIsClaimed] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { node } = useMerkle();
  const { claim, isClaiming, checkIsClaimed, checkingClaim, nftAddress } =
    useClaim();

  useEffect(() => {
    const f = async () => {
      if (index > -1) {
        setIsClaimed(await checkIsClaimed(index));
      }
    };
    f();
  }, [index, checkIsClaimed]);

  const content = useCallback(() => {
    if (isConnected && proof.length && isClaimed) {
      const network = networks[chain.id];
      let url = "https://opensea.io/";
      if (chain.testnet) {
        url = "https://testnets.opensea.io";
      }
      return (
        <>
          <StyledH1>
            Thanks for supporting Umbra. Your Umbra OG Collectible:
          </StyledH1>
          <Image
            src="/nft.gif"
            alt="Umbra OG NFT"
            height="180px"
            width="180px"
          />
          <a
            href={`${url}/assets/${network.name.toLowerCase()}/${nftAddress}/${index}`}
          >
            View on OpenSea
          </a>
        </>
      );
    } else if (isConnected && proof.length) {
      return (
        <>
          <StyledH1>
            Thanks for supporting Umbra! Please claim your Umbra Collectible as
            a token of our support
          </StyledH1>
          {isClaiming ? (
            <TailSpin
              height="80"
              width="80"
              color={theme.colors.primary}
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
            />
          ) : (
            <Button
              size="md"
              disabled={chain?.unsupported || false}
              onClick={() => {
                const f = async () => {
                  const claimed = await claim({
                    account: address,
                    index,
                    proof,
                  });
                  if (claimed) {
                    setIsClaimed(true);
                  }
                };
                f();
              }}
            >
              Claim
            </Button>
          )}
        </>
      );
    } else if (isConnected && !node) {
      return (
        <>
          <StyledH1>Your Address does not qualify</StyledH1>
          <p>
            Only addreses that contributed to the Umbra Gitcoin grant in the
            first year qualify
          </p>
        </>
      );
    } else {
      return (
        <>
          <StyledH1>Connect wallet to claim Umbra NFT</StyledH1>
          <ConnectButton />
        </>
      );
    }
  }, [
    isConnected,
    proof,
    address,
    claim,
    index,
    node,
    isClaiming,
    isClaimed,
    chain,
    nftAddress,
  ]);

  useEffect(() => {
    console.log(address);
    console.log(node);
    if (address && node) {
      setProof(node.proof);
      setIndex(node.index);
    } else {
      setProof([]);
      setIndex(-1);
    }
  }, [address, node]);

  return (
    <StyledPage>
      {checkingClaim ? (
        <TailSpin
          height="80"
          width="80"
          color={theme.colors.primary}
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
      ) : (
        content()
      )}
    </StyledPage>
  );
}

export default Index;
