import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  it("Should deploy", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("neelansh", "fbgm");
    await token.deployed();

    const DAO = await ethers.getContractFactory("DAO");
    const dao1 = await DAO.deploy(token.address);
    const dao2 = await dao1.deployed();
    await dao2.votingDelay();
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
