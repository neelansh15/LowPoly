import { expect } from "chai";
import { ethers } from "hardhat";
import { Token } from "../typechain";

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

  it("Should delegate and transfer votes", async function(){

    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";

    const token = await Token.deploy(name, symbol);
    await token.deployed();
    const [owner, account1] = await ethers.getSigners();
    await token.delegate(account1.address);
    console.log(await token.delegates(owner.address));
    console.log(await token.getVotes(owner.address));
    console.log(await token.address);
    // console.log(
    //   await token.delegateBySig(
    //     token.address,
    //     123,
    //     34,
    //     15,
        
    //   ));
   
    // const name1 = "TestToken1";
    // const symbol1 = "TT1";
    
    // const token1 = await Token.deploy(name1, symbol1);
    // await token1.deployed();

    // console.log(await token1.getVotes(token1.address));
    
    // console.log(await token.moveVotingPower(token.address, token1.address, 50));
    // await token._afterTokenTransfer(token.address,token1.address,50);
  });
});

