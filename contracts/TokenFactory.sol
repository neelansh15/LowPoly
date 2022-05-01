// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Token.sol";

contract TokenFactory {
    // Mapping of owner addresses to their created Tokens
    mapping(address => address[]) private _tokens;

    event NewToken(address _tokenAddress, string _name, string _symbol);

    // Make something payable to charge minting fees
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) public returns (Token) {
        Token token = new Token(name, symbol, totalSupply, msg.sender);
        _tokens[msg.sender].push(address(token));
        token.transferOwnership(msg.sender);
        emit NewToken(address(token), name, symbol);
        return token;
    }

    function getTokensOf(address _address)
        public
        view
        returns (address[] memory)
    {
        return _tokens[_address];
    }

    // // DEX functions
    // function buy(address tokenAddress) public payable {
    //     Token token = Token(tokenAddress);
    //     uint256 amount = msg.value;
    //     require(amount > 1, "Minimum amount is 1 wei");
    //     token.transfer(msg.sender, amount);
    // }
}
