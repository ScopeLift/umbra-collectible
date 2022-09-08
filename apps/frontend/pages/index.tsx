import React, { useCallback, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { useAccount } from "wagmi";

import { useMerkle } from "../contexts/MerkleContext";
import { useClaim } from "../hooks/useClaim";

// Initial styles this will change
const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const StyledButton = styled.button`
  font-size: 14px;
  line-height: 1.715em;
  font-weight: 500;
  color: #d69903;
  background: none;
  border: 1px solid #d69903;
  border-radius: 5px;
`;

export function Index() {
  const [proof, setProof] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isClaimed, setIsClaimed] = useState(false);
  const { address, isConnected } = useAccount();
  const { node } = useMerkle();
  const { claim, isClaiming, checkIsClaimed } = useClaim();

  useEffect(() => {
    const f = async () => {
      setIsClaimed(await checkIsClaimed(index));
    };
    f();
  }, [index, checkIsClaimed]);

  const content = useCallback(() => {
    if (isConnected && proof.length && isClaimed) {
      return (
        <>
          <h1>You have already claimed your Umbra NFT</h1>
          <ConnectButton />
        </>
      );
    } else if (isConnected && proof.length) {
      return (
        <>
          <h1>Claim your Umbra NFT</h1>
          <ConnectButton />
          {isClaiming ? (
            <>Claiming...</>
          ) : (
            <StyledButton
              onClick={() => claim({ account: address, index, proof })}
            >
              Claim
            </StyledButton>
          )}
        </>
      );
    } else if (isConnected && !node) {
      return (
        <>
          <h1>Your Address does not qualify</h1>
          <ConnectButton />
        </>
      );
    } else {
      return (
        <>
          <h1>Connect wallet to claim Umbra NFT</h1>
          <ConnectButton />
        </>
      );
    }
  }, [isConnected, proof, address, claim, index, node, isClaiming, isClaimed]);

  useEffect(() => {
    if (address && node) {
      setProof(node.proof);
      setIndex(node.index);
    }
  }, [address, node]);

  return <StyledPage>{content()}</StyledPage>;
}

export default Index;
