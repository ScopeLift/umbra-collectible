// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IMintableNFT {
  function mint(address to, uint256 id) external;
}
