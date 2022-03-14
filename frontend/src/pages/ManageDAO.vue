<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { ethers } from "ethers";
import HeaderCard from "~/components/HeaderCard.vue";
import tokenData from "../../../abis/token.json";
import { useTokenContract } from "~/utils/useContract";

onMounted(init);

const tokenInfo = reactive({
  name: "",
  symbol: "",
  decimals: -1,
});

async function init() {
  const tokenContract = useTokenContract(tokenData.address);
  tokenInfo.name = await tokenContract.name();
  tokenInfo.symbol = await tokenContract.symbol();
  tokenInfo.decimals = await tokenContract.decimals();
}
</script>

<template>
  <div>
    <HeaderCard>
      <h1 class="text-7xl font-bold">Manage DAO</h1>
    </HeaderCard>

    <div class="p-10">
      <b>Token Info</b>
      <p>{{ tokenInfo.name }}</p>
      <p>{{ tokenInfo.symbol }}</p>
      <p>{{ tokenInfo.decimals }}</p>
    </div>
  </div>
</template>
