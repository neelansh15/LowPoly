import { expect } from "chai";
import { ethers } from "hardhat";

describe("LowPoly Factory", function () {
  it("Should deploy new token contract and fetch it", async function () {
    const LowPolyFactory = await ethers.getContractFactory("LowPolyFactory");
    const factory = await LowPolyFactory.deploy();
    await factory.deployed();

    // Tokens to deploy from owner account
    const tokenList = [
      {
        name: "Sample Token",
        symbol: "SAMP",
      },
      {
        name: "Rampant Token",
        symbol: "RAMP",
      },
      {
        name: "Crampant Token",
        symbol: "CAMP",
      },
    ];
    console.log(
      "response from testing new token creation ",
      await factory.createToken("mytest", "mysymbol")
    );
    await Promise.all(
      tokenList.map(async (token) => {
        return factory.createToken(token.name, token.symbol);
      })
    );

    const mytokens = await factory.getTokens();
    console.log("My Created Tokens", mytokens);

    for (let i = 0; i < tokenList.length; i++) {
      const tokenContract = await ethers.getContractAt("Token", mytokens[i]);
      const tokenName = await tokenContract.name();
      const tokenSymbol = await tokenContract.symbol();
      console.log("Token Details", { tokenName, tokenSymbol });
      await expect(tokenName).to.equal(tokenList[i].name);
      await expect(tokenSymbol).to.equal(tokenList[i].symbol);
    }
  });
});
