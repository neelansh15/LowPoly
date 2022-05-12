import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe.only("LowPoly Factories", function () {
  it("Token Factory: Should deploy new token contract and fetch it", async function () {
    const LowPolyFactory = await ethers.getContractFactory("DAOFactory");
    const factory = await LowPolyFactory.deploy();
    await factory.deployed();

    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy();
    await tokenFactory.deployed();

    const tokenResult = await tokenFactory.createToken(
      "dabest",
      "dab",
      parseEther("100000")
    );
    console.log("Result of createDAO", tokenResult);

    const result = await factory.createDao("MyDao", "MyToken", tokenResult as any);
    console.log("Result of createDAO", result);
  });
});
