// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract Token is ERC20, Ownable, ERC20Permit, ERC20Votes {

    address public _factory;

    /**
        Owner can transfer tokens to the token factory for purchase by others.
        Transfer ownership from factory to actual owner.
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 totalSupply,
        address _ownerAddress
    ) ERC20(_name, _symbol) ERC20Permit(_name) {
        _mint(_ownerAddress, totalSupply * 10**decimals());
        _factory = msg.sender;
    }

    function factory() external view returns(address) {
        return _factory;
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
