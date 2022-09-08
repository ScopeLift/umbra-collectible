import addresses from "../utils/addresses.json" assert { type: "json" };
import { ethers } from "ethers";
import fs from "fs";

const main = () => {
  const leaves = addresses["addresses"].map((address, index) => {
    return ethers.utils.keccak256(
      ethers.utils.solidityPack(["uint256", "address"], [index, address[0]])
    );
  });

  fs.writeFile(
    "./utils/merkleLeaves.json",
    JSON.stringify({ leaves: leaves }),
    (err) => {
      console.log(err);
    }
  );
};

main();
