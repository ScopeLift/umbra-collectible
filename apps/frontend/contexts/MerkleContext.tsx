import React, { createContext, useContext, useEffect, useState } from "react";
import { MerkleTree } from "merkletreejs";
import { ethers } from "ethers";

import leavesJsonfrom from "../utils/merkleLeaves.json";
import { keccak256 } from "ethers/lib/utils";

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
    setMerkleTree(new MerkleTree(leavesJsonfrom["leaves"], keccak256));
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
