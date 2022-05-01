import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  // DEX
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy();

  await dex.deployed();

  const data = {
    address: dex.address,
    abi: JSON.parse(dex.interface.format("json") as string),
  };
  writeFileSync("./abis/DEX.json", JSON.stringify(data));

  console.log("LowPoly DEX deployed to:", dex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
