// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "hardhat/console.sol";

contract DEX {
    // Store specific token's ether balances
    mapping(address => uint256) private _tokenBalances;

    function deposit() external payable {}

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // DEX functions
    function buy(address tokenAddress) external payable {
        Token token = Token(tokenAddress);
        uint256 amount = msg.value;
        require(amount > 1, "Minimum amount is 1 wei");
        require(
            token.balanceOf(address(this)) > amount,
            "Insufficient funds in contract"
        );
        _tokenBalances[tokenAddress] = _tokenBalances[tokenAddress] + amount;
        token.transfer(msg.sender, amount);
    }

    // How much ether is collected for a token
    function tokenEtherBalance(address tokenAddress)
        external
        view
        returns (uint256)
    {
        return _tokenBalances[tokenAddress];
    }

    // Withdraw token funds to owner of non-profit (token owner)
    function withdraw(address tokenAddress, uint256 amount) external {
        require(
            _tokenBalances[tokenAddress] >= amount,
            "Insufficient ether balance for token"
        );

        Token token = Token(tokenAddress);
        require(
            msg.sender == token.owner(),
            "Only token owner can withdraw funds"
        );

        _tokenBalances[tokenAddress] = _tokenBalances[tokenAddress] - amount;
        // msg.sender.call{value: amount};
        payable(msg.sender).transfer(amount);
    }

    // Withdraw all token funds to owner of non-profit (token owner)
    function withdrawAll(address tokenAddress) external {
        Token token = Token(tokenAddress);
        require(
            msg.sender == token.owner(),
            "Only token owner can withdraw funds"
        );

        uint256 amount = _tokenBalances[tokenAddress];
        _tokenBalances[tokenAddress] = _tokenBalances[tokenAddress] - amount;
        // msg.sender.call{value: amount};
        payable(msg.sender).transfer(amount);
    }
}
