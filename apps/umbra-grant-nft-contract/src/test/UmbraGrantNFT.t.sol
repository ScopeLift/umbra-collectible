// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "../UmbraGrantNFT.sol";
import {UmbraNFTIntialized, UmbraNFTBaseSetup} from "./Setup.t.sol";

contract UmbraGrantNFTInitializeTest is UmbraNFTBaseSetup {
  event Initialized(uint8 version);

  function testCalledOnce() public {
    // Assert contract initialized
    hevm.expectEmit(true, false, false, true);
    emit Initialized(1);
    collectible.initialize(minterAddr);
  }

  function testFailCalledTwice() public {
    collectible.initialize(minterAddr);
    collectible.initialize(minterAddr);
  }

  function testFailCalledByOtherContract() public {
    hevm.prank(randomAddr);
    collectible.initialize(minterAddr);
  }

  function testOwnerMinterRoleAdmin() public {
    collectible.revokeRole(collectible.MINTER_ROLE(), minterAddr);
  }
}

contract UmbraGrantNFTMintTest is UmbraNFTIntialized {
  function testFailOwnerMints() public {
    collectible.mint(randomAddr, 1);
  }

  function testFailRandomAddrMint() public {
    hevm.prank(randomAddr);
    collectible.mint(randomAddr, 1);
  }

  function testClaimPeriodEnd() public {
    // After constructor value in base setup
    hevm.warp(1692062154);
    hevm.prank(minterAddr);
    hevm.expectRevert(UmbraGrantNFT.ClaimPeriodClosed.selector);
    collectible.mint(randomAddr, 1);
  }

  function testMint() public {
    hevm.prank(minterAddr);
    collectible.mint(randomAddr, 1);
    address owner = collectible.ownerOf(1);
    assertTrue(owner == randomAddr);
  }
}

contract UmbraGrantNFTSupportsInterfaceTest is UmbraNFTIntialized {
  function testAllInterfacesSupported() public {
    bool one = collectible.supportsInterface(0x01ffc9a7);
    assertTrue(one);

    bool two = collectible.supportsInterface(0x80ac58cd);
    assertTrue(two);

    bool three = collectible.supportsInterface(0x5b5e139f);
    assertTrue(three);

    bool four = collectible.supportsInterface(type(IAccessControl).interfaceId);
    assertTrue(four);
  }
}

contract UmbraGrantNFTTokenUriTest is UmbraNFTIntialized {
  function testNoToken() public {
    hevm.expectRevert(UmbraGrantNFT.TokenDoesNotExist.selector);
    collectible.tokenURI(1);
  }

  function testTokenUri() public {
    hevm.prank(minterAddr);
    collectible.mint(randomAddr, 1);
    string memory uri = collectible.tokenURI(1);
    string
      memory expectedUri = "ipfs://QmTr1uNQogh2kKR356qLWcAtpMCCwLMb5MRutkAbPtRdHQ";
    assertEq(uri, expectedUri);
  }
}
