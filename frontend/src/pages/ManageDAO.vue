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
const delegate = reactive({
  address: "",
});
const transfer = reactive({
  address: "",
  amount: 0,
});

async function delegateVotes() {
  const tokenContract = useTokenContract(tokenData.address);
  if (tokenContract) {
    await tokenContract.delegate(delegate.address);
  }
  console.log("Done");
}

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
      <form action="transferTokens">
        <input type="text" v-model="transfer.address" placeholder="Address" />
        <input
          class="ml-3"
          type="text"
          v-model="transfer.amount"
          placeholder="Amount"
        />
        <PrimaryButton class="ml-3" type="submit">
          Transfer tokens
        </PrimaryButton>
      </form>
    </div>

    <div class="p-10">
      <b>Delegate votes</b>
      <form>
        <input type="text" v-model="delegate.address" placeholder="Address" />
        <PrimaryButton class="ml-3" type="button" @click="delegateVotes">
          Delegate votes
        </PrimaryButton>
      </form>
    </div>
  </div>
</template>
