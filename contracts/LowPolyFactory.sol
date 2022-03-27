// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Token.sol";
// import "./DAO.sol";

contract LowPolyFactory {
    // Mapping of owner addresses to their created Tokens
    mapping(address => address[]) private _tokens;
    // Mapping of owner addresses to their created DAOs
    mapping(address => address[]) private _daos;

    event NewToken(address _tokenAddress, string _name, string _symbol);
    event NewDAO(address _daoAddress, address _tokenAddress);

    // Make something payable to charge minting fees
    function createToken(string memory name, string memory symbol)
        public
        payable
        returns (Token)
    {
        Token token = new Token(name, symbol);
        _tokens[msg.sender].push(address(token));
        emit NewToken(address(token), name, symbol);
        return token;
    }

    // function createDAO(IVotes tokenAddress) public payable returns (DAO) {
    //     DAO dao = new DAO(tokenAddress);
    //     _daos[msg.sender].push(address(dao));
    //     emit NewDAO(address(dao), address(tokenAddress));
    //     return dao;
    // }

    function getTokens() public view returns (address[] memory) {
        return _tokens[msg.sender];
    }

    function getDAOs() public view returns (address[] memory) {
        return _daos[msg.sender];
    }
}
