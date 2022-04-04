import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
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
