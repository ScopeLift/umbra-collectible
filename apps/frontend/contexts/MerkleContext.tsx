import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import merkleData from "../utils/merkleData.json";

type Node = {
  acccount: string;
  index: number;
  proof: string[];
};

export type MerkleContextType = {
  node: Node | null;
};

const initialContext = {
  node: null,
};

const MerkleContext = createContext<MerkleContextType>(initialContext);

export const MerkleProvider = ({ children }) => {
  const [node, setNode] = useState(null);
  const { address } = useAccount();
  useEffect(() => {
    setNode(merkleData[address]);
  }, [address]);
  return (
    <MerkleContext.Provider
      value={{
        node,
      }}
    >
      {children}
    </MerkleContext.Provider>
  );
};

export const useMerkle = () => useContext(MerkleContext);
