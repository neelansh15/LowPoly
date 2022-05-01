<template>
  <div v-if="walletConnected && address">
    {{ address.slice(0, 5) + "..." + address.slice(38, 42) }}
  </div>
  <div v-else>
    <button @click="connectWallet">Connect to Wallet</button>
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useWeb3Store } from "../store/web3Store";

const walletConnected = ref(false);
// const address = computed(() => useWeb3Store.ad);
// const chainId = ref(0);

const { address, chainId, web3provider } = storeToRefs(useWeb3Store());
const { setAlchemyprovider } = useWeb3Store();
const init = async () => {
  const provider = window.ethereum;

  const permissions = await provider.request({
    method: "wallet_getPermissions",
  });
  if (
    permissions.length > 0 &&
    permissions[0].parentCapability === "eth_accounts"
  ) {
    connectWallet();
  }

  const alchemyProvider = new ethers.providers.AlchemyProvider(
    "maticmum",
    "fWVG_3ipWJMJsAe6kQm3Hx9HsAUBHJxN"
  );
  setAlchemyprovider(alchemyProvider);
};
onMounted(init);

async function connectWallet() {
  const wallet = useWeb3Store();

  const provider = window.ethereum;

  const web3Provider = new ethers.providers.Web3Provider(provider, "any");

  const network = await web3Provider.getNetwork();
  wallet.setWeb3provider(web3Provider);
  wallet.setChainId(network.chainId);
  const signer = web3Provider.getSigner();
  wallet.setAddress(await signer.getAddress());

  function accountsChanged(accounts: string[]) {
    if (accounts.length == 0) {
      walletConnected.value = false;
      wallet.setAddress(null);
      disconnect();
    } else {
      wallet.setAddress(accounts[0]);
    }
  }

  provider.on("accountsChanged", accountsChanged);

  function chainChanged(newChainId: string) {
    newChainId = newChainId.split("x")[1];
    wallet.setChainId(parseInt(newChainId));
    console.log({ changedChain: chainId });
  }
  provider.on("chainChanged", chainChanged);

  function disconnect() {
    console.log("disconnect");
    wallet.updateWeb3Wallet(null, null, null);
    provider.removeListener("accountsChanged", accountsChanged);
    provider.removeListener("disconnect", disconnect);
    provider.removeListener("chainChanged", chainChanged);
  }

  provider.on("disconnect", disconnect);

  // let balance = web3Provider.getBalance(address.value);
  // wallet.updateWeb3Wallet(chainId.value, address.value, web3Provider);
  walletConnected.value = true;
}
</script>

<style></style>
