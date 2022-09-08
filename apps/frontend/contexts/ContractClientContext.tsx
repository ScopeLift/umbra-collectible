import React, { createContext, useContext, useEffect, useState } from "react";
import { UmbraNFTDistributorContract } from "@umbra-collectible/umbra-grant-contract-client";
import { NetworkConfig, networks } from "../utils/networks";
import { useNetwork, useSigner } from "wagmi";

type Props = {
  children: React.ReactNode;
  networks: { [key: number]: NetworkConfig };
};

export type ContractClientContextType = {
  distributor: UmbraNFTDistributorContract | null;
};

const initialContext = {
  distributor: null,
};

const ContractClientContext =
  createContext<ContractClientContextType>(initialContext);

export const ContractClientProvider = ({ children }: Props) => {
  const { chain } = useNetwork();
  const { data: signer } = useSigner({
    onError(error) {
      console.log("Error", error);
    },
  });
  const [network, setNetwork] = useState(null);
  const [distributor, setDistributor] = useState(null);

  useEffect(() => {
    if (!chain?.unsupported) {
      setNetwork(networks[chain?.id]);
    }
  }, [chain]);

  useEffect(() => {
    if (network && signer) {
      const contract = new UmbraNFTDistributorContract(network, signer);
      setDistributor(contract);
    }
  }, [chain, signer, network]);

  return (
    <ContractClientContext.Provider value={{ distributor }}>
      {children}
    </ContractClientContext.Provider>
  );
};

export const useContractClient = () => useContext(ContractClientContext);
