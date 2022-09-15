// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/StdJson.sol";
import "../src/UmbraGrantNFT.sol";
import "../src/MerkleDistributor.sol";

contract DeployCollectible is Script {
  using stdJson for string;

  function run()
    external
    returns (
      address,
      address,
      bytes32
    )
  {
    string memory json = vm.readFile("./script/data/root.json");
    bytes32 root = json.readBytes32(".root");

    vm.broadcast();
    UmbraGrantNFT nft = new UmbraGrantNFT(
      "Umbra OG Supporters",
      "UMBRAOG",
      block.timestamp + 365 days
    );

    vm.broadcast();
    MerkleDistributor distributor = new MerkleDistributor(address(nft), root);

    vm.broadcast();
    nft.initialize(address(distributor));
    return (address(nft), address(distributor), root);
  }
}
