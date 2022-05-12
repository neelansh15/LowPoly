import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { Token } from "../typechain";
// import { ethers } from "ethers";
// import "@nomiclabs/hardhat-web3";

// describe("DAO", function () {
//   it("Should deploy", async function () {
//     const Token = await ethers.getContractFactory("Token");

//     const name = "TestToken";
//     const symbol = "TT";

//     const [owner] = await ethers.getSigners();
//     const token = await Token.deploy(name, symbol, 2000, owner.address);

//     await expect(await token.name()).to.equal(name);
//     await expect(await token.symbol()).to.equal(symbol);

//     const DAO = await ethers.getContractFactory("DAO");
//     const dao1 = await DAO.deploy("neelansh", token.address);
//     const dao2 = await dao1.deployed();

//     await dao2.votingDelay();
//   });
// });

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

describe("Creating and Executing Proposals", async function () {
  it("Get proposal id", async function () {
    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";
    const [owner, account1] = await ethers.getSigners();
    const token1 = await Token.deploy(name, symbol, 1000, owner.address);
    await token1.deployed();

    const tokenAddress = token1.address;
    const token2 = await ethers.getContractAt("ERC20", tokenAddress);
    await token1.connect(owner).delegate(owner.address);
    const DAO = await ethers.getContractFactory("DAO");
    console.log("token address", token2.address);
    const DAO1 = await DAO.deploy("Devs4shah", "parthshahbest", token2.address);
    await DAO1.deployed();

    const OwnerAddress = owner.address;
    const grantAmount = 0;
    const transferCalldata = token2.interface.encodeFunctionData("transfer", [
      OwnerAddress,
      grantAmount,
    ]);

    console.log(
      await DAO1.propose(
        [tokenAddress],
        [0],
        [transferCalldata],
        "Proposal #1: Give grant to team"
      )
    );
  });

  it("Cast a vote to a proposal", async function () {
    const Token = await ethers.getContractFactory("Token");
    const name = "TestToken";
    const symbol = "TT";
    const [owner, account1] = await ethers.getSigners();
    const token1 = await Token.deploy(name, symbol, 12, owner.address);
    await token1.deployed();

    const tokenAddress = token1.address;
    const token2 = await ethers.getContractAt("ERC20", tokenAddress);

    const DAO = await ethers.getContractFactory("DAO");
    console.log("token address", token2.address);
    const DAO1 = await DAO.deploy("Devs4shah", "parthshahbest", token2.address);
    await DAO1.deployed();

    const OwnerAddress = owner.address;
    const grantAmount = 100;
    const transferCalldata = token2.interface.encodeFunctionData("transfer", [
      OwnerAddress,
      grantAmount,
    ]);

    await token1.connect(owner).delegate(owner.address);

    const pid = await DAO1.propose(
      [tokenAddress],
      [0],
      [transferCalldata],
      "Proposal #1: Give grant to team"
    );
    console.log("Proposal id", pid);
    await token1.transfer(account1.address, 100);

    console.log("Owner tokens", await token1.balanceOf(owner.address));
    console.log("Account1 tokens", await token1.balanceOf(account1.address));
    await token1.connect(account1).delegate(account1.address);
    console.log("account1 votes", await token1.getVotes(account1.address));

    console.log(
      "Cast vote",
      await DAO1.castVote(
        ethers.BigNumber.from(
          "59140839572732244541528800328699297753643426744731966667961496830265219228955"
        ),
        0
      )
    );

    console.log(
      "This is my proposal votes",
      await DAO1.proposalVotes(
        ethers.BigNumber.from(
          "59140839572732244541528800328699297753643426744731966667961496830265219228955"
        )
      )
    );

    await DAO1.connect(account1);
    // console.log(
    //   "Proposal state",
    //   await DAO1.state(
    //     ethers.BigNumber.from(
    //       "21340126980592625873694296579883979257315173036002618818160889272297796635842"
    // )));

    console.log(
      "Cast vote",
      await DAO1.castVote(
        ethers.BigNumber.from(
          "59140839572732244541528800328699297753643426744731966667961496830265219228955"
        ),
        1
      )
    );

    console.log(
      "This is my proposal votes",
      await DAO1.proposalVotes(
        ethers.BigNumber.from(
          "21340126980592625873694296579883979257315173036002618818160889272297796635842"
        )
      )
    );

    // await token1.connect(owner).delegate(account1.address);
    // console.log("Voting period", await DAO1.votingDelay());
  });
});
