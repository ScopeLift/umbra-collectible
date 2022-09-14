import { storeIpfs } from "./helpers/ipfs.js";

const main = async () => {
  const nftMetadata = {
    name: "Umbra OG Supporter",
    description:
      "A collectible NFT for everyone who contributed to Umbra's Gitcoin Grant in its first year.",
    image: "ipfs://bafybeihjajj3baoiuk2b4ny5uodx6uvvb73c67xkqhrvtckdos6xie4kfa",
  };
  const ipfsPath = await storeIpfs(JSON.stringify(nftMetadata));
  console.log(ipfsPath);
};

main();
