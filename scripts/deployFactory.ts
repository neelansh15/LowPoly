import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  // Token Factory
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  await tokenFactory.deployed();

  const tokenFactoryData = {
    address: tokenFactory.address,
    abi: JSON.parse(tokenFactory.interface.format("json") as string),
  };
  writeFileSync("./abis/tokenFactory.json", JSON.stringify(tokenFactoryData));

  console.log("LowPoly tokenFactory deployed to:", tokenFactory.address);

  // DAO Factory
  const DAOFactory = await ethers.getContractFactory("DAOFactory");
  const daoFactory = await DAOFactory.deploy();

  await daoFactory.deployed();

  const daoFactoryData = {
    address: daoFactory.address,
    abi: JSON.parse(daoFactory.interface.format("json") as string),
  };
  writeFileSync("./abis/daoFactory.json", JSON.stringify(daoFactoryData));

  console.log("LowPoly daoFactory deployed to:", daoFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});