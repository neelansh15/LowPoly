import { expect } from "chai";
import { ethers } from "hardhat";
import { Token } from "../typechain";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


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

  it("Should delegate votes", async function(){

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

  });

  it("Create proposal and cast votes", async function(){

    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";
    const token1 = await Token.deploy(name, symbol);
    await token1.deployed();

    const tokenAddress = token1.address ;
    const [owner, account1] = await ethers.getSigners();
    const token = await ethers.getContractAt('ERC20', tokenAddress);
    // const teamAddress = account1.address;
    // const grantAmount = 0;
    // const transferCalldata = token.interface.encodeFunctionData(‘transfer’, [teamAddress, grantAmount]);
    // const proposeId= await governor.propose(
    //   [tokenAddress],
    //   [0],
    //   [transferCalldata],
    //   “Proposal #1: Give grant to team”,
    // );


  })
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

