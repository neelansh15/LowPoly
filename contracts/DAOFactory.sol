// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./DAO.sol";

contract DAOFactory {
    // Mapping of owner addresses to their created DAOs
    mapping(address => address[]) public _daos;

    event NewDAO(address _daoAddress, address _tokenAddress);

    function createDAO(string memory name, IVotes tokenAddress)
        public
        returns (DAO)
    {
        DAO dao = new DAO(name, tokenAddress);
        _daos[msg.sender].push(address(dao));
        emit NewDAO(address(dao), address(tokenAddress));
        return dao;
    }

    function getDAOs() public view returns (address[] memory) {
        return _daos[msg.sender];
    }
}
