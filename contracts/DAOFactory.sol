// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./DAO.sol";

contract DAOFactory {
    // Mapping of owner addresses to their created DAOs
    mapping(address => address[]) public _daos;
    uint256 public startBlock;

    event NewDao(string name, address indexed _daoAddress, address indexed _tokenAddress);

    constructor() {
        startBlock = block.number;
    }

    function createDao(
        string memory name,
        string memory tokenName,
        IVotes tokenAddress
    ) public returns (address) {
        address dao = address(new DAO(name, tokenName, tokenAddress));
        _daos[msg.sender].push(dao);
        emit NewDao(name, dao, address(tokenAddress));
        return dao;
    }

    function getDAOs() public view returns (address[] memory) {
        return _daos[msg.sender];
    }
}
