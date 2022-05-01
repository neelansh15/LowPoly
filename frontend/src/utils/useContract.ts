import { ethers } from "ethers";
import tokenData from "../../../abis/token.json";
import tokenFactoryData from "../../../abis/tokenFactory.json";
import DAOFactoryData from "../../../abis/daoFactory.json";
import DAOData from "../../../abis/dao.json";
import DEXData from "../../../abis/DEX.json";
import { useWeb3Store } from "~/store/web3Store";

export function useContract(address: string, abi: any, customProvider?: any) {
  const { web3provider } = useWeb3Store();
  const provider =
    customProvider ||
    web3provider ||
    new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, abi, provider.getSigner());
  return contract;
}

export function useTokenContract(address: string, useAlchemy = false) {
  const { alchemyProvider } = useWeb3Store();

  const tokenContract = useContract(
    address,
    tokenData.abi,
    useAlchemy ? alchemyProvider : null
  );
  return tokenContract;
}

export function useDAOContract(address: string, useAlchemy = false) {
  const { alchemyProvider } = useWeb3Store();
  const DAOContract = useContract(
    address,
    DAOData.abi,
    useAlchemy ? alchemyProvider : null
  );
  return DAOContract;
}

export function useTokenFactoryContract() {
  const { alchemyProvider } = useWeb3Store();
  const tokenFactoryContract = useContract(
    tokenFactoryData.address,
    tokenFactoryData.abi,
    alchemyProvider
  );
  return tokenFactoryContract;
}

export function useDAOFactoryContract() {
  const { alchemyProvider } = useWeb3Store();

  const DAOFactoryContract = useContract(
    DAOFactoryData.address,
    DAOFactoryData.abi,
    alchemyProvider
  );
  return DAOFactoryContract;
}

export function useDEXContract() {
  const DEXContract = useContract(DEXData.address, DEXData.abi);
  return DEXContract;
}
