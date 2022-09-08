import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { useAccount } from "wagmi";

import { useMerkle } from "../contexts/MerkleContext";
import { useClaim } from "../hooks/useClaim";
import { keccak256 } from "ethers/lib/utils";
import addresses from "../utils/addresses.json";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export function Index() {
  const [proof, setProof] = useState([]);
  const [index, setIndex] = useState(-1);
  const { address, isConnected } = useAccount();
  const { merkleTree } = useMerkle();
  const { claim, isClaiming } = useClaim();

  const content = useCallback(() => {
    if (isConnected && proof.length) {
      console.log(proof);
      return (
        <>
          <h1>Claim your Umbra NFT</h1>
          <ConnectButton />
          {isClaiming ? (
            <>Claiming...</>
          ) : (
            <button onClick={() => claim({ account: address, index, proof })}>
              Claim
            </button>
          )}
        </>
      );
    } else if (isConnected && !proof.length && merkleTree) {
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
  }, [isConnected, proof, address, claim]);

  useEffect(() => {
    console.log("index");
    console.log(index);
    console.log([address]);
    console.log(addresses["addresses"]);
    let effectIndex = index;
    for (const [idx, addr] of addresses["addresses"].entries()) {
      if (addr[0] === address) {
        effectIndex = idx;
        setIndex(idx);
        break;
      }
    }
    if (address && effectIndex >= 0 && merkleTree) {
      const root = merkleTree.getRoot();
      console.log("root");
      console.log(root);
      console.log(root.toString());
      console.log(root.toString("hex"));
      setProof(
        merkleTree.getHexProof(
          keccak256(
            ethers.utils.solidityPack(["uint256", "address"], [index, address])
          )
        )
      );
    }
  }, [address, merkleTree]);

  return <StyledPage>{content()}</StyledPage>;
}

export default Index;
