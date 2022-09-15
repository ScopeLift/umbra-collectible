pragma solidity ^0.8.13;

import "../../src/UmbraGrantNFT.sol";
import "../../src/MerkleDistributor.sol";
import "../Collectible.s.sol";
import {DSTestPlus} from "solmate/test/utils/DSTestPlus.sol";

contract CollectibleDeployTests is DSTestPlus {
  address public nftAddr;
  address public distributorAddr;
  bytes32 public merkleRoot;

  function setUp() public {
    DeployCollectible deploy = new DeployCollectible();
    (nftAddr, distributorAddr, merkleRoot) = deploy.run();
  }

  function testNFTArgs() public {
    UmbraGrantNFT nft = UmbraGrantNFT(nftAddr);
    assertEq(nft.name(), "Umbra OG Supporters");
    assertEq(nft.symbol(), "UMBRAOG");
    assertEq(nft.claimPeriodEnd(), block.timestamp + 365 days);
    assertTrue(nft.hasRole(nft.MINTER_ROLE(), distributorAddr));
  }

  function tesFailNFTInitialized() public {
    UmbraGrantNFT nft = UmbraGrantNFT(nftAddr);
    nft.initialize(address(this));
  }

  function testDistributorArgs() public {
    MerkleDistributor distributor = MerkleDistributor(distributorAddr);
    assertEq(distributor.merkleRoot(), merkleRoot);
    assertEq(distributor.collectible(), nftAddr);
  }
}
