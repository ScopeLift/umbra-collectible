export const networks = {
  80001: {
    chainId: 80001,
    address: process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS,
    name: "PolygonMumbai",
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
