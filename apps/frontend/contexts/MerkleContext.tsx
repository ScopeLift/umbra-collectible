import React, { createContext, useContext, useEffect, useState } from "react";
import { MerkleTree } from "merkletreejs";

import addresses from "../utils/addresses.json";
import keccak256 from "keccak256";

export type MerkleContextType = {
  merkleTree: MerkleTree | null;
};

const initialContext = {
  merkleTree: null,
};

const MerkleContext = createContext<MerkleContextType>(initialContext);

export const MerkleProvider = ({ children }) => {
  const [merkleTree, setMerkleTree] = useState(null);
  useEffect(() => {
    const leaves = addresses["addresses"].map((address) => {
      return keccak256(address[0]);
    });
    setMerkleTree(new MerkleTree(leaves, keccak256));
  }, []);
  return (
    <MerkleContext.Provider
      value={{
        merkleTree,
      }}
    >
      {children}
    </MerkleContext.Provider>
  );
};

export const useMerkle = () => useContext(MerkleContext);
