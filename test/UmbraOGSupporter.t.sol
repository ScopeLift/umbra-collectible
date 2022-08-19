// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {DSTestPlus} from "solmate/test/utils/DSTestPlus.sol";
import "../src/UmbraOGSupporter.sol";

abstract contract UmbraOGSupporterBaseSetup is DSTestPlus {
    UmbraOGSupporter public collectible;
    address public randomAddr;

    constructor() {
        randomAddr = hevm.addr(1);
        collectible = new UmbraOGSupporter("Umbra OG Supporter", "UMBRAOG");
    }
}

contract UmbraOGSupportMintTest is UmbraOGSupporterBaseSetup {
    function testMint() public {
        collectible.mint(randomAddr, 1);
    }
}
