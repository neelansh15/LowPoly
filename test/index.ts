import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  it("Should deploy", async function () {
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(ethers.constants.AddressZero);
    await dao.deployed();
  });
});
