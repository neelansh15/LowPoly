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

  it("Should delegate votes", async function () {
    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";

    const token = await Token.deploy(name, symbol);
    await token.deployed();
    const [account1] = await ethers.getSigners();
    await token.delegate(account1.address);

  });

  it("Transfer votes", async function () {
    const Token = await ethers.getContractFactory("Token")
    const name = "TestToken";
    const symbol = "TT";

    const token1 = await Token.deploy(name, symbol);
    await token1.deployed();

    const [owner, account1, account2] = await ethers.getSigners();

    await token1.delegate(account1.address);
    await token1.mint(account1.address, 200);
    // console.log(await token1.getVotes(account1.address));
    
    await token1.connect(account2).delegate(account2.address);
   
    await token1.mint(account2.address, 250);
    // console.log(await token1.getVotes(account2.address));

    await token1.connect(owner).delegate(owner.address);
    
    await token1.mint(owner.address, 300);
    console.log(await token1.getVotes(owner.address));
    await token1.afterTokenTransfer(owner.address, account1.address, 100);
    console.log(await token1.getVotes(account1.address));

    
    

    // const token2 = await ethers.getContractAt("ERC20", tokenAddress);
    // const teamAddress = account1.address;
    // const grantAmount = 0;
    // const transferCalldata = token.interface.encodeFunctionData(‘transfer’, [teamAddress, grantAmount]);
    // const proposeId= await governor.propose(
    //   [tokenAddress],
    //   [0],
    //   [transferCalldata],
    //   “Proposal #1: Give grant to team”,
    // );
  });
});

// describe("LowPolyFactory", function () {
//   it("Should deploy new token contract and fetch it", async function () {
//     const LowPolyFactory = await ethers.getContractFactory("LowPolyFactory");
//     const factory = await LowPolyFactory.deploy();
//     await factory.deployed();

//     await factory.createToken("Sample token", "SAMP");
//     const mytokens = await factory.getTokens();
//     console.log(mytokens);
//   });
// });