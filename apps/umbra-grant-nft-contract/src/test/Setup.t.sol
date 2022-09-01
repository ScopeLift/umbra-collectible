// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import {DSTestPlus} from "solmate/test/utils/DSTestPlus.sol";
import "../UmbraGrantNFT.sol";
import "../MerkleDistributor.sol";

abstract contract UmbraNFTBaseSetup is DSTestPlus {
  UmbraGrantNFT public collectible;
  address public minterAddr;
  address public randomAddr;

  function setUp() public virtual {
    minterAddr = hevm.addr(0xBEEF);
    randomAddr = hevm.addr(1);
    collectible = new UmbraGrantNFT(
      "Umbra OG Supporter",
      "UMBRAOG",
      1692052154
    );
  }
}

abstract contract UmbraNFTIntialized is UmbraNFTBaseSetup {
  function setUp() public virtual override {
    super.setUp();
    collectible.initialize(minterAddr);
  }
}
