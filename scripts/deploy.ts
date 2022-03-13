// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // DEPLOY TOKEN
  // const Token = await ethers.getContractFactory("MoneyGon");
  // const token = await Token.deploy();

  // await token.deployed();

  // console.log("token deployed to:", token.address);

  // DEPLOY DAO
  const DAO = await ethers.getContractFactory("DAO");
  const dao = await DAO.deploy("0xf145192Db921b0e2A6699748eD3630b956b6CD19");

  await dao.deployed();

  console.log("dao deployed to:", dao.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
