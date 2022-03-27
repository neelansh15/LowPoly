import { ethers } from "ethers";
import tokenData from "../../../abis/token.json";
import tokenFactoryData from "../../../abis/tokenFactory.json";
import DAOFactoryData from "../../../abis/DAOFactory.json";
import { useWeb3Store } from "~/store/web3Store";

export function useContract(address: string, abi: any) {
  const { web3provider } = useWeb3Store();
  // if (!web3provider) {
  //   console.error("Error: web3Provider from store is null in useContract/useContract");
  //   return null;
  // }
  const provider =
    web3provider || new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, abi, provider.getSigner());
  return contract;
}

export function useTokenContract() {
  const tokenContract = useContract(tokenData.address, tokenData.abi);
  return tokenContract;
}

export function useTokenFactoryContract() {
  const tokenFactoryContract = useContract(
    tokenFactoryData.address,
    tokenFactoryData.abi,
  );
  return tokenFactoryContract;
}
export function useDAOFactoryContract() {
  const DAOFactoryContract = useContract(
    DAOFactoryData.address,
    DAOFactoryData.abi,
  );
  return DAOFactoryContract;
}
