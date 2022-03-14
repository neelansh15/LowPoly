// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Token.sol";
import "./DAO.sol";

contract LowPolyFactory {
    // Mapping of owner addresses to their created Tokens
    mapping(address => Token[]) _tokens;
    // Mapping of owner addresses to their created DAOs
    mapping(address => DAO[]) _daos;

    function createToken(string memory name, string memory symbol)
        public
        payable
    {
        Token token = new Token(name, symbol);
        _tokens[msg.sender].push(token);
    }
}
