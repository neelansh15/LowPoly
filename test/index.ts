import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  it("Should deploy", async function () {
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(ethers.constants.AddressZero);
    await dao.deployed();
  });
});

describe("Token", function () {
  it("Should deploy token", async function () {
    const Token = await ethers.getContractFactory("Token");

    const name = "TestToken";
    const symbol = "TT";

    const token = await Token.deploy(name, symbol);
    await token.deployed();
  });
});
