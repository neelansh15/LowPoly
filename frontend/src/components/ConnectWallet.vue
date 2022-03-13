<template>
  <button @click="connectWallet">Connect to Wallet</button>
</template>

<script>
import { ethers } from "ethers";
//chain id
// eventHandler: accountChange, networkChange, disconnect
// network change pe emit global
export default {
  name: "ConnectWallet",
  methods: {
    connectWallet: async function () {
      const provider = window.ethereum;

      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any",
      );
      await web3Provider.send("eth_requestAccounts", []);
      const network = await web3Provider.getNetwork();
      const chainId = network.chainId;
      console.log(network, chainId);
      console.log({ accounts: web3Provider.listAccounts() });
      const signer = web3Provider.getSigner();
      let address = await signer.getAddress();
      console.log("Account:", address);
      provider.on("accountsChanged", account => {
        address = account[0];
        console.log({ changeAccount: account });
      });
      let balance = web3Provider.getBalance(address);
      console.log({ balance: balance });
    },
  },
};
</script>

<style></style>
