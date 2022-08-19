// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {UmbraNFTBaseSetup} from "./Setup.t.sol";
import "../MerkleDistributor.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";
import {Merkle} from "murky/Merkle.sol";

contract MerkeleDistributorMissingTree is UmbraNFTBaseSetup {
  MerkleDistributor public distributor;
  bytes32 ZeroBytes32 = bytes32(0);

  function setUp() public {
    distributor = new MerkleDistributor(address(collectible), ZeroBytes32);
  }

  function testCollectibleAddress() public {
    assertEq(distributor.collectible(), address(collectible));
  }

  function testZeroMerkleRoot() public {
    assertEq(distributor.merkleRoot(), ZeroBytes32);
  }

  function testEmptyProof() public {
    bytes32[] memory emptyProof;
    hevm.expectRevert("MerkleDistributor: Invalid proof.");
    distributor.claim(0, randomAddr, emptyProof);
  }
}

contract MerkleDistributorTwoLeafTree is UmbraNFTBaseSetup {
  Merkle public tree;
  MerkleDistributor public distributor;
  bytes32[] public data = new bytes32[](2);
  address public addr1 = hevm.addr(1);
  address public addr2 = hevm.addr(2);
  event Claimed(uint256 index, address account);

  function setUp() public {
    tree = new Merkle();
    data[0] = bytes32(keccak256(abi.encodePacked(uint256(0), addr1)));
    data[1] = bytes32(keccak256(abi.encodePacked(uint256(1), addr2)));
    distributor = new MerkleDistributor(
      address(collectible),
      tree.getRoot(data)
    );
    collectible.initialize(address(distributor));
  }

  function testClaim() public {
    hevm.expectEmit(true, true, false, true);
    emit Claimed(0, addr1);
    distributor.claim(0, addr1, tree.getProof(data, 0));

    hevm.expectEmit(true, true, false, true);
    emit Claimed(1, addr2);
    distributor.claim(1, addr2, tree.getProof(data, 1));
  }

  function testClaimBalance() public {
    assertEq(collectible.balanceOf(addr1), 0);
    assertEq(collectible.balanceOf(addr2), 0);

    hevm.expectEmit(true, true, false, true);
    emit Claimed(0, addr1);
    distributor.claim(0, addr1, tree.getProof(data, 0));
    assertEq(collectible.balanceOf(addr1), 1);

    hevm.expectEmit(true, true, false, true);
    emit Claimed(1, addr2);
    distributor.claim(1, addr2, tree.getProof(data, 1));
    assertEq(collectible.balanceOf(addr2), 1);
  }

  function testCannotClaimMoreThanOnce() public {
    bytes32[] memory proof = tree.getProof(data, 0);
    distributor.claim(0, addr1, proof);
    hevm.expectRevert("MerkleDistributor: Drop already claimed.");
    distributor.claim(0, addr1, proof);
  }

  function testCannotClaimMoreThanOnceZeroThanOne() public {
    bytes32[] memory proof = tree.getProof(data, 0);
    distributor.claim(0, addr1, proof);
    distributor.claim(1, addr2, tree.getProof(data, 1));
    hevm.expectRevert("MerkleDistributor: Drop already claimed.");
    distributor.claim(0, addr1, proof);
  }

  function testCannotClaimOtherProof() public {
    bytes32[] memory proof = tree.getProof(data, 1);
    hevm.expectRevert("MerkleDistributor: Invalid proof.");
    distributor.claim(0, addr1, proof);
  }
}

contract MerkleDistributorFuzzTree is UmbraNFTBaseSetup {
  MerkleDistributor public distributor;
  bytes32[] public data;
  Vm public constant vm = Vm(HEVM_ADDRESS);
  event Claimed(uint256 index, address account);

  function treeSetup(uint256 size) public returns (Merkle) {
    data = new bytes32[](size);
    Merkle t = new Merkle();
    for (uint256 i = 0; i < size; i++) {
      data[i] = bytes32(
        keccak256(abi.encodePacked(uint256(i), hevm.addr(i + 1)))
      );
    }
    distributor = new MerkleDistributor(address(collectible), t.getRoot(data));
    collectible.initialize(address(distributor));
    return t;
  }

  function testClaimLargerTreeFour() public {
    Merkle tree = treeSetup(10_000);
    uint16 claimOne = 4;
    address addr1 = hevm.addr(claimOne + 1);
    hevm.expectEmit(true, true, false, true);
    emit Claimed(claimOne, addr1);
    distributor.claim(claimOne, addr1, tree.getProof(data, claimOne));
  }

  function testClaimLargerTreeNine() public {
    Merkle tree = treeSetup(10_000);
    uint16 claimOne = 9;
    address addr1 = hevm.addr(claimOne + 1);
    hevm.expectEmit(true, true, false, true);
    emit Claimed(claimOne, addr1);
    distributor.claim(claimOne, addr1, tree.getProof(data, claimOne));
  }

  function testClaimLargerTreeDeep() public {
    Merkle tree = treeSetup(65_553);
    uint256 claimOne = 60_000;
    address addr1 = hevm.addr(claimOne + 1);
    hevm.expectEmit(true, true, false, true);
    emit Claimed(claimOne, addr1);
    distributor.claim(claimOne, addr1, tree.getProof(data, claimOne));
  }

  function testAllClaims() public {
    uint256 size = 1000;
    Merkle tree = treeSetup(size);
    for (uint256 i = 0; i < size; i++) {
      address addr1 = hevm.addr(i + 1);
      hevm.expectEmit(true, true, false, true);
      emit Claimed(i, addr1);
      bytes32[] memory proof = tree.getProof(data, i);
      distributor.claim(i, addr1, proof);

      hevm.expectRevert("MerkleDistributor: Drop already claimed.");
      distributor.claim(i, addr1, proof);
    }
  }
}
