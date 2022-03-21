// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // DEPLOY TOKEN
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("TestToken1", "TT1");

  await token.deployed();

  const tokenData = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json") as string),
  };
  writeFileSync("./abis/token.json", JSON.stringify(tokenData));

  console.log("token deployed to:", token.address);

  // DEPLOY DAO (for testing, actually need only LowPoly contract)
  // const DAO = await ethers.getContractFactory("DAO");
  // const dao = await DAO.deploy("0xf145192Db921b0e2A6699748eD3630b956b6CD19");

  // await dao.deployed();

  // const daoData = {
  //   address: dao.address,
  //   abi: JSON.parse(dao.interface.format("json") as string),
  // };
  // writeFileSync("./abis/dao.json", JSON.stringify(daoData));

  // console.log("dao deployed to:", dao.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
