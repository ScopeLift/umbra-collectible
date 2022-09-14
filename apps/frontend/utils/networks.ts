import { isHexString } from "@ethersproject/bytes";

export const networks = {
  4: {
    chainId: 4,
    address: process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS,
    name: "Rinkeby",
    blockExplorerUrl: "https://rinkeby.etherscan.io",
  },
  5: {
    chainId: 5,
    address: process.env.NEXT_PUBLIC_GOERLI_CONTRACT_ADDRESS,
    name: "Goerli",
    blockExplorerUrl: "https://goerli.etherscan.io",
  },
  137: {
    chainId: 137,
    address: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS,
    name: "Matic",
    blockExplorerUrl: "https://polygonscan.com/",
  },
  80001: {
    chainId: 80001,
    address: process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS,
    name: "Mumbai",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  },
  31337: {
    chainId: 31337,
    address: process.env.NEXT_PUBLIC_LOCAL_CONTRACT_ADDRESS,
    name: "Local chain",
  },
};

export type NetworkConfig = {
  chainId: number;
  address: string;
  name: string;
};

export const getEtherscanUrl = (txHashOrAddress: string, chainId: number) => {
  const group = isHexString(txHashOrAddress)
    ? txHashOrAddress.length === 42
      ? "address"
      : "tx"
    : "ens";
  const chain = networks[chainId];
  const networkPrefix = chain?.blockExplorerUrl
    ? chain?.blockExplorerUrl
    : "https://etherscan.io";
  if (group === "ens") {
    return `${networkPrefix}`;
  } else {
    return `${networkPrefix}/${group}/${txHashOrAddress}`;
  }
};
