import { expect } from "chai";
import { ethers } from "hardhat";

describe("LowPoly DEX", function(){
    it("Should show contract's ether balance", async function (){
        const dexFactory = await ethers.getContractFactory("DEX")
        const dex = await dexFactory.deploy()

        const result = await dex.sell()
        console.log("result", result)
    })
})
