<template>
  <div v-if="walletConnected">
    {{ address.slice(0, 6) + "..." + address.slice(12, 18) }}
  </div>
  <div v-else>
    <button @click="connectWallet">Connect to Wallet</button>
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { emit } from "process";
import { ref } from "vue";
import { useWeb3Store } from "../stores/web3Store";

const walletConnected = ref(false);
const address = ref("");
const chainId = ref(0);

async function connectWallet() {
  const wallet = useWeb3Store();

  const provider = window.ethereum;

  const web3Provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any",
  );

  await web3Provider.send("eth_requestAccounts", []);

  const network = await web3Provider.getNetwork();
  chainId.value = network.chainId;
  const signer = web3Provider.getSigner();
  address.value = await signer.getAddress();

  provider.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length == 0) {
      address.value = "";
      walletConnected.value = false;
    } else {
      address.value = accounts[0];
    }
    console.log({ changeAccount: accounts });
    wallet.updateAddress(address.value);
  });
  provider.on("disconnect", (event: any) => {
    wallet.updateWeb3Wallet(null, null, null);
  });
  provider.on("chainChanged", (newChainId: string) => {
    newChainId = newChainId.split("x")[1];
    chainId.value = parseInt(newChainId);
    console.log({ changedChain: chainId.value });
    wallet.updateChainId(chainId.value);
  });

  // let balance = web3Provider.getBalance(address.value);
  wallet.updateWeb3Wallet(chainId.value, address.value, web3Provider);
  walletConnected.value = true;
}
</script>

<style></style>
