import { defineStore } from "pinia";
import { ethers } from "ethers";

export const useWeb3Store = defineStore("web3", {
  state: () => {
    return {
      chainId: null as number | null,
      address: null as string | null,
      web3provider: null as ethers.providers.Web3Provider | null,
      alchemyProvider: null as ethers.providers.AlchemyProvider | null,
    };
  },

  actions: {
    updateWeb3Wallet(
      chainId: number | null,
      address: string | null,
      web3provider: ethers.providers.Web3Provider | null
    ) {
      this.chainId = chainId;
      this.address = address;
      this.web3provider = web3provider;
    },
    setAddress(address: string | null) {
      this.address = address;
    },
    setChainId(chainId: number | null) {
      this.chainId = chainId;
    },
    setWeb3provider(provider: ethers.providers.Web3Provider | null) {
      this.web3provider = provider;
    },
    setAlchemyprovider(provider: ethers.providers.AlchemyProvider | null) {
      this.alchemyProvider = provider;
    },
  },
});
