import { expect } from "chai";
import { ethers } from "hardhat";
import { Token } from "../typechain";

describe("DAO", function () {
  it("Should deploy", async function () {
    const Token = await ethers.getContractFactory("Token");

    const name = "TestToken";
    const symbol = "TT";

    const [owner] = await ethers.getSigners();
    const token = await Token.deploy(name, symbol, 2000, owner.address);

    await expect(await token.name()).to.equal(name);
    await expect(await token.symbol()).to.equal(symbol);

    const DAO = await ethers.getContractFactory("DAO");
    const dao1 = await DAO.deploy("neelansh", token.address);
    const dao2 = await dao1.deployed();

    await dao2.votingDelay();
  });
});

describe("Token", async function () {
  it("It should tranfer tokens", async function () {
    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";
    const [account1, account2] = await ethers.getSigners();
    const token = await Token.deploy(name, symbol, 2000, account1.address);
    await token.deployed();
    // await token.mint(account1.address, 500);
    console.log("Account 1 tokens", await token.balanceOf(account1.address));
    await token.transfer(account2.address, 300);
    console.log("Account 2 tokens", await token.balanceOf(account2.address));
    console.log("Account 1 tokens", await token.balanceOf(account1.address));
  });

  it("it should transfer votes", async function () {
    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";
    const [owner, accountx] = await ethers.getSigners();
    const token1 = await Token.deploy(name, symbol, 2000, owner.address);
    await token1.deployed();
    console.log(await token1.balanceOf(owner.address));
    await token1.connect(accountx).delegate(accountx.address);
    console.log(await token1.getVotes(owner.address));
    await token1.transfer(accountx.address, 100);
    console.log(await token1.getVotes(accountx.address));
    console.log(await token1.balanceOf(accountx.address));
});
});
