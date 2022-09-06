import React, { useCallback, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { useAccount } from "wagmi";

import { useMerkle } from "../contexts/MerkleContext";
import { keccak256 } from "ethers/lib/utils";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export function Index() {
  const [proof, setProof] = useState([]);
  const { address, isConnected } = useAccount();
  const { merkleTree } = useMerkle();
  const content = useCallback(() => {
    if (isConnected && proof.length) {
      return (
        <>
          <h1>Claim your Umbra NFT</h1>
          <ConnectButton />
          <button>Claim</button>
        </>
      );
    } else if (isConnected && !proof.length) {
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
  }, [isConnected, proof]);

  useEffect(() => {
    if (address) {
      setProof(merkleTree.getProof(keccak256(address)));
    }
  }, [address, merkleTree]);

  return <StyledPage>{content()}</StyledPage>;
}

export default Index;
