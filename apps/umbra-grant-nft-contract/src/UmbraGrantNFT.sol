// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "solmate/tokens/ERC721.sol";

contract UmbraGrantNFT is ERC721, AccessControl, Initializable {
  error TokenDoesNotExist();
  error ClaimPeriodClosed();

  /// @dev Unix timestamp when nfts can no longer be minted
  uint256 public claimPeriodEnd;
  bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  /**
   * @param _name            Name of the NFT
   * @param _symbol          Symbol of the NFT
   * @param _claimPeriodEnd  A unix timestamp after which no more NFTs will be minted
   */
  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _claimPeriodEnd
  ) ERC721(_name, _symbol) {
    claimPeriodEnd = _claimPeriodEnd;
    _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
    _setRoleAdmin(MINTER_ROLE, OWNER_ROLE);
    _setupRole(OWNER_ROLE, msg.sender);
  }

  /**
   * @param _minter  Contract to receive the minter role
   */
  function initialize(address _minter) public onlyRole(OWNER_ROLE) initializer {
    _setupRole(MINTER_ROLE, _minter);
  }

  function mint(address to, uint256 id) public onlyRole(MINTER_ROLE) {
    if (block.timestamp > claimPeriodEnd) {
      revert ClaimPeriodClosed();
    }
    _safeMint(to, id);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, AccessControl)
    returns (bool)
  {
    return
      interfaceId == 0x01ffc9a7 || // ERC165 Interface ID for ERC165
      interfaceId == 0x80ac58cd || // ERC165 Interface ID for ERC721
      interfaceId == 0x5b5e139f || // ERC165 Interface ID for ERC721Metadata
      super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 id) public view override returns (string memory) {
    if (_ownerOf[id] == address(0)) {
      revert TokenDoesNotExist();
    }
    return "ipfs://QmZ5VogPeYhvTkSu5sn4LSs9G8JrjWF8ApGujgJzTHHmDK";
  }
}
