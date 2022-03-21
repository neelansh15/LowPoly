import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  it("Should deploy", async function () {
    const Token = await ethers.getContractFactory("Token");

    const name = "TestToken";
    const symbol = "TT";

    const token = await Token.deploy(name, symbol);
    await token.deployed();

    await expect(await token.name()).to.equal(name);
    await expect(await token.symbol()).to.equal(symbol);

    const DAO = await ethers.getContractFactory("DAO");
    const dao1 = await DAO.deploy(token.address);
    const dao2 = await dao1.deployed();

    await dao2.votingDelay();
  });
});

describe("LowPolyFactory", function () {
  it("Should deploy new token contract and fetch it", async function () {
    const LowPolyFactory = await ethers.getContractFactory("LowPolyFactory");
    const factory = await LowPolyFactory.deploy();
    await factory.deployed();

    await factory.createToken("Mah Man token", "MAHMAN");

    const mytokens = await factory.getTokens();
    console.log(mytokens);
  });
});
