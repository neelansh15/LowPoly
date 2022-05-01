import { expect } from "chai";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe.only("LowPoly DEX", function () {
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

    await token.transfer(dex.address, parseEther("1000"));

    await dex.buy(token.address, {
      value: parseEther(amount),
    });

    const thisTokenEtherBalance = await dex.tokenEtherBalance(token.address);
    console.log("DEX token ether balance", formatEther(thisTokenEtherBalance));
    expect(+formatEther(thisTokenEtherBalance)).to.equal(+amount);

    const dexTotalBalance = await dex.getBalance();
    console.log("DEX total balance", +formatEther(dexTotalBalance));
    expect(+formatEther(dexTotalBalance)).to.equal(+amount);

    // let userTokenBalance = +formatEther(await token.balanceOf(owner.address));
    // console.log("user token balance after all this", userTokenBalance);
    // expect(userTokenBalance).to.equal(+totalSupply - 1000 + amount);

    // Withdraw
    await dex.withdrawAll(token.address);
    const thisTokenEtherBalanceAfterWithdraw = await dex.tokenEtherBalance(
      token.address
    );
    console.log(
      "DEX token ether balance after withdraw",
      formatEther(thisTokenEtherBalanceAfterWithdraw)
    );
    expect(+formatEther(thisTokenEtherBalanceAfterWithdraw)).to.equal(0);
  });
});
