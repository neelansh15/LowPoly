import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  it("Should return the new greeting once it's changed", async function () {
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(ethers.constants.AddressZero);
    await dao.deployed();
  });
});
