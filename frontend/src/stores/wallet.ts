import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return { chainId: -1, address: "" };
  },

  actions: {
    updateAddress(address: string) {
      this.address = address;
    },
  },
});
