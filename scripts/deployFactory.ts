import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const Factory = await ethers.getContractFactory("LowPolyFactory");
  const factory = await Factory.deploy();

  await factory.deployed();

  const factoryData = {
    address: factory.address,
    abi: JSON.parse(factory.interface.format("json") as string),
  };
  writeFileSync("./abis/LowPolyFactory.json", JSON.stringify(factoryData));

  console.log("LowPoly Factory deployed to:", factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
