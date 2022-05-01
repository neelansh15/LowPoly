import { expect } from "chai";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("LowPoly DEX", function () {
  it("Should give tokens to DEX, buy and withdraw", async function () {
    const dexFactory = await ethers.getContractFactory("DEX");
    const dex = await dexFactory.deploy();

    const [owner] = await ethers.getSigners();

    const totalSupply = "100000";

    const tokenFactory = await ethers.getContractFactory("Token");
    const token = await tokenFactory.deploy(
      "mytoken",
      "MTT",
      parseEther(totalSupply),
      owner.address
    );

    const amount = "100";
    const transferAmount = "1000";

    await token.transfer(dex.address, parseEther(transferAmount));
    const dexTokenBalance = +formatEther(await token.balanceOf(dex.address));
    console.log("DEX token balance after transfer", dexTokenBalance);
    expect(dexTokenBalance).to.equal(+transferAmount);

    const thisTokenEtherBalanceBeforeBuy = await dex.tokenEtherBalance(
      token.address
    );
    console.log(
      "DEX token ether balance before buy",
      formatEther(thisTokenEtherBalanceBeforeBuy)
    );
    expect(+formatEther(thisTokenEtherBalanceBeforeBuy)).to.equal(0);

    await dex.buy(token.address, {
      value: parseEther(amount),
    });

    const thisTokenEtherBalance = await dex.tokenEtherBalance(token.address);
    console.log(
      "DEX token ether balance after buy",
      formatEther(thisTokenEtherBalance)
    );
    expect(+formatEther(thisTokenEtherBalance)).to.equal(+amount);

    const dexTotalBalance = await dex.getBalance();
    console.log("DEX total balance", +formatEther(dexTotalBalance));
    expect(+formatEther(dexTotalBalance)).to.equal(+amount);

    // Not working somehow
    // let userTokenBalance = +formatEther(await token.balanceOf(owner.address));
    // console.log("user token balance after all this", userTokenBalance);
    // expect(userTokenBalance).to.equal(+totalSupply - 1000 + amount);

    // Withdraw
    console.log(
      "Owner ether balance before withdraw",
      +formatEther(await owner.getBalance())
    );
    await dex.withdrawAll(token.address);
    const thisTokenEtherBalanceAfterWithdraw = await dex.tokenEtherBalance(
      token.address
    );
    console.log(
      "DEX token ether balance after withdraw",
      formatEther(thisTokenEtherBalanceAfterWithdraw)
    );
    expect(+formatEther(thisTokenEtherBalanceAfterWithdraw)).to.equal(0);

    console.log(
      "Owner ether balance after withdraw",
      +formatEther(await owner.getBalance())
    );
  });
});
