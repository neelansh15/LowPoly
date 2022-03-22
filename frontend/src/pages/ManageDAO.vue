<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { ethers } from "ethers";
import HeaderCard from "~/components/HeaderCard.vue";
import tokenData from "../../../abis/token.json";
import { useTokenContract } from "~/utils/useContract";
import PrimaryButton from "~/components/PrimaryButton.vue";

onMounted(init);

const tokenInfo = reactive({
  name: "",
  symbol: "",
  decimals: -1,
});

async function init() {
  const tokenContract = useTokenContract(tokenData.address);
  if (tokenContract) {
    tokenInfo.name = await tokenContract.name();
    tokenInfo.symbol = await tokenContract.symbol();
    tokenInfo.decimals = await tokenContract.decimals();
  }
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

    <div class="p-10">
      <b>Transfer tokens</b>
      <form action="">
        <input type="text" placeholder="Address" />
        <input class="ml-3" type="text" placeholder="Amount" />
        <PrimaryButton class="ml-3" type="submit"
          >Transfer tokens</PrimaryButton
        >
      </form>
    </div>

    <div class="p-10">
      <b>Delegate votes</b>
      <form action="">
        <input type="text" placeholder="Address" />
        <PrimaryButton class="ml-3" type="submit">Delegate votes</PrimaryButton>
      </form>
    </div>
  </div>
</template>
