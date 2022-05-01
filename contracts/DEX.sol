// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract DEX {
    // DEX functions
    function buy(address tokenAddress) public payable {
        Token token = Token(tokenAddress);
        uint256 amount = msg.value;
        require(amount > 1, "Minimum amount is 1 wei");
        require(token.balanceOf(address(this)) > amount, "Insufficient funds in contract");
        token.transfer(msg.sender, amount);
    }
}
