// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "hardhat/console.sol";

contract DEX {
    function deposit() external payable {}

    // DEX functions
    function buy(address tokenAddress) external payable {
        Token token = Token(tokenAddress);
        uint256 amount = msg.value;
        require(amount > 1, "Minimum amount is 1 wei");
        require(
            token.balanceOf(address(this)) > amount,
            "Insufficient funds in contract"
        );
        token.transfer(msg.sender, amount);
    }

    // Needs approval to spend first (need to be done on the frontend)
    function sell(address tokenAddress, uint256 amount) external {
        Token token = Token(tokenAddress);
        require(msg.sender == token.owner(), "Only token owner is allowed");
        require(
            address(this).balance > amount,
            "Insufficient funds in DEX contract"
        );
        token.transferFrom(msg.sender, address(this), amount);
        msg.sender.call{value: amount};
    }
}
