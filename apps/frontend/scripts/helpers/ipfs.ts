import { create, CID } from "ipfs-http-client";
import { Buffer } from "buffer";

export const getIPFSClient = () => {
  const auth =
    "Basic " +
    Buffer.from(
      process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_PROJECT_SECRET
    ).toString("base64");
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return ipfs;
};

export const storeIpfs = async (content: any | ArrayBuffer) => {
  const ipfs = getIPFSClient();
  const cid = await ipfs.add(content);
  await ipfs.pin.add(CID.parse(cid.path));
  return `ipfs://${cid.path}`;
};
