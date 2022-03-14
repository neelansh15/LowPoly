<template>
  <div v-if="walletConnected"></div>
  <div v-else>
    <button @click="connectWallet">Connect to Wallet</button>
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { ref } from "vue";
import { useWeb3Store } from "../stores/web3Store";

const walletConnected = ref(false);
const address = ref("");

async function connectWallet() {
  const wallet = useWeb3Store();

  const provider = window.ethereum;

  const web3Provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any",
  );

  await web3Provider.send("eth_requestAccounts", []);

  const network = await web3Provider.getNetwork();
  const chainId = network.chainId;
  const signer = web3Provider.getSigner();
  address.value = await signer.getAddress();

  // provider.on("accountsChanged", (account: string[]) => {
  //   address.value = account[0];
  //   console.log({ changeAccount: account });
  // });
  // provider.on("disconnect", (account: string[]) => {
  //   address.value = account[0];
  //   console.log({ changeAccount: account });
  // });
  // provider.on("chainChanged", (account: string[]) => {
  //   address.value = account[0];
  //   console.log({ changeAccount: account });
  // });

  let balance = web3Provider.getBalance(address.value);
  wallet.updateWeb3Wallet(chainId, address.value, web3Provider);
  walletConnected.value = true;
}
</script>

<style></style>
