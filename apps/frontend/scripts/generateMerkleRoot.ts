import fs from "fs";
import AccountTree from "../utils/tree/accountTree.js";

import addresses from "../utils/addresses.json" assert { type: "json" };

const main = () => {
  const tree = new AccountTree(addresses["addresses"]);
  fs.writeFile(
    "../umbra-grant-nft-contract/script/data/root.json",
    JSON.stringify({ root: tree.getHexRoot() }),
    (err) => {
      console.log(err);
    }
  );
};

main();
