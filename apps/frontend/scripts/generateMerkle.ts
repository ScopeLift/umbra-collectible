import fs from "fs";
import AccountTree from "./helpers/accountTree.js";

import addresses from "../utils/addresses.json" assert { type: "json" };

const main = () => {
  const tree = new AccountTree(addresses["addresses"]);
  const claims = {};
  addresses["addresses"].map((address, index) => {
    claims[address] = {
      account: address,
      index,
      proof: tree.getProof(index, address),
    };
  });

  fs.writeFile("./utils/merkleData.json", JSON.stringify(claims), (err) => {
    console.log(err);
  });
  fs.writeFile(
    "../umbra-grant-nft-contract/script/data/root.json",
    JSON.stringify({ root: tree.getHexRoot() }),
    (err) => {
      console.log(err);
    }
  );
};

main();
