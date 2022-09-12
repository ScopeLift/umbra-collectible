import { isHexString } from "@ethersproject/bytes";

export const networks = {
  80001: {
    chainId: 80001,
    address: process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS,
    name: "PolygonMumbai",
    blockExplorerUrls: "https://mumbai.polygonscan.com/",
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
  const networkPrefix = chain?.blockExplorerUrls?.length
    ? chain?.blockExplorerUrls[0]
    : "https://etherscan.io";
  if (group === "ens") {
    return `${networkPrefix}`;
  } else {
    return `${networkPrefix}/${group}/${txHashOrAddress}`;
  }
};
