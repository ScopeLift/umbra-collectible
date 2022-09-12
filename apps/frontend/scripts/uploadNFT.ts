import { storeIpfs } from "./helpers/ipfs.js";

const main = async () => {
  const nftMetadata = {
    name: "Umbra Grant NFT",
    description:
      "An NFT given to contributors of Umbra cash's initial Gitcoin grant round.",
    image: "ipfs://bafybeihjajj3baoiuk2b4ny5uodx6uvvb73c67xkqhrvtckdos6xie4kfa",
  };
  const ipfsPath = await storeIpfs(JSON.stringify(nftMetadata));
  console.log(ipfsPath);
};

main();
