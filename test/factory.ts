import { expect } from "chai";
import { ethers } from "hardhat";


describe("LowPoly Factories", function () {
  it("Token Factory: Should deploy new token contract and fetch it", async function () {
    const LowPolyFactory = await ethers.getContractFactory("TokenFactory");
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
    
    await Promise.all(
      tokenList.map(async (token) => {
        return factory.createToken(token.name, token.symbol, 3000);
      })
    );

//     const mytokens = await factory.getTokens();
//     console.log("My Created Tokens", mytokens);

//     for (let i = 0; i < tokenList.length; i++) {
//       const tokenContract = await ethers.getContractAt("Token", mytokens[i]);
//       const tokenName = await tokenContract.name();
//       const tokenSymbol = await tokenContract.symbol();
//       console.log("Token Details", { tokenName, tokenSymbol });
//       await expect(tokenName).to.equal(tokenList[i].name);
//       await expect(tokenSymbol).to.equal(tokenList[i].symbol);
//     }
//   });
// });
  });
});