// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {Merkle} from "murky/Merkle.sol";
import "../src/UmbraGrantNFT.sol";
import "../src/MerkleDistributor.sol";

contract DeployCollectible is Script {
  function run() external {
    string memory path = vm.envString("CONTRIBUTION_DATA_PATH");
    string memory json = vm.readFile(path);
    bytes memory encodedAddresses = vm.parseJson(json, ".addresses");
    address[][] memory addresses = abi.decode(encodedAddresses, (address[][]));

    uint256 numAddr = addresses.length;
    bytes32[] memory data = new bytes32[](numAddr);
    for (uint256 i = 0; i < numAddr; i++) {
      address addr = addresses[i][0];
      data[i] = bytes32(keccak256(abi.encodePacked(uint256(i), addr)));
    }
    Merkle tree = new Merkle();

    vm.broadcast();
    UmbraGrantNFT nft = new UmbraGrantNFT(
      "Umbra OG Supporter",
      "UMBRAOG",
      block.timestamp + 365
    );

    bytes32 root = tree.getRoot(data);

    vm.broadcast();
    MerkleDistributor distributor = new MerkleDistributor(address(nft), root);

    vm.broadcast();
    nft.initialize(address(distributor));
  }
}
