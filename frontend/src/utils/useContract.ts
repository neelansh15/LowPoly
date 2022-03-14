import { ethers } from "ethers";
import tokenData from "../../../abis/token.json";

export function useContract(address: string, abi: any) {
  // Temporary until state management
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const contract = new ethers.Contract(address, abi, provider.getSigner());
  return contract;
}

export function useTokenContract(address: string) {
  const tokenContract = useContract(address, tokenData.abi);
  return tokenContract;
}
