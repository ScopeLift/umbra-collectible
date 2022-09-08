import MerkleTree from "./merkleTree.mjs";
import { utils } from "ethers";

export default class AccountTree {
  constructor(accounts) {
    this.tree = new MerkleTree(
      accounts.map((account, index) => {
        return AccountTree.toNode(index, account);
      })
    );
  }

  static verifyProof(index, account, proof, root) {
    let pair = AccountTree.toNode(index, account);
    for (const item of proof) {
      pair = MerkleTree.combinedHash(pair, item);
    }

    return pair.equals(root);
  }

  // keccak256(abi.encode(index, account, amount))
  static toNode(index, account, amount) {
    return Buffer.from(
      utils
        .solidityKeccak256(["uint256", "address"], [index, account])
        .substr(2),
      "hex"
    );
  }

  getHexRoot() {
    return this.tree.getHexRoot();
  }

  // returns the hex bytes32 values of the proof
  getProof(index, account, amount) {
    return this.tree.getHexProof(AccountTree.toNode(index, account));
  }
}
