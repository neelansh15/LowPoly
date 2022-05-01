// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract Token is ERC20, Ownable, ERC20Permit, ERC20Votes {
    address private _factory;
    address private _owner;

    /**
        Maintain two owners: _factory owner who owns this contract and _owner
        who is the user that created this from the factory

        Give 20% to Token Factory and 80% to owner.
        Owner can freely transfer more to the token factory
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 totalSupply,
        address _ownerAddress
    ) ERC20(_name, _symbol) ERC20Permit(_name) {
        _mint(msg.sender, totalSupply * 20 / 100 * 10**decimals());
        _mint(_ownerAddress, totalSupply * 80 / 100 * 10**decimals());
        _factory = msg.sender;
        _owner = _ownerAddress;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
