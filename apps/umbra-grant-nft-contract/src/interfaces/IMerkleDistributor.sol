// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Allows anyone to claim a token if they exist in a merkle root.
interface IMerkleDistributor {
  // Returns the address of the collectible distributed by this contract.
  function collectible() external view returns (address);

  // Returns the merkle root of the merkle tree containing account balances available to claim.
  function merkleRoot() external view returns (bytes32);

  // Returns true if the index has been marked claimed.
  function isClaimed(uint256 index) external view returns (bool);

  // Claim the given collectible to the given address. Reverts if the inputs are invalid.
  function claim(
    uint256 index,
    address account,
    bytes32[] calldata merkleProof
  ) external;

  // This event is triggered whenever a call to #claim succeeds.
  event Claimed(uint256 index, address account);
}
