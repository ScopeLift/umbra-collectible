import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";
import AccountTree from "../utils/tree/accountTree";
import { ethers } from "ethers";

import addresses from "../utils/addresses.json";

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
  const tree = useMemo(() => new AccountTree(addresses["addresses"]), []);

  useEffect(() => {
    if (!address) {
      return;
    }
    const index = addresses["addresses"].findIndex(
      (addr) => addr.toLowerCase() === address.toLowerCase()
    );
    try {
      const proof = tree.getProof(index, address);
      setNode({
        account: address,
        index,
        proof,
      });
    } catch (err) {
      setNode(null);
    }
  }, [address, tree]);
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
