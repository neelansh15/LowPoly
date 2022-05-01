<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import HeaderCard from "~/components/HeaderCard.vue";
import { useDAOContract, useTokenContract } from "~/utils/useContract";
import PrimaryButton from "~/components/PrimaryButton.vue";
import ProposalCard from "~/components/ProposalCard.vue";
import { ethers } from "ethers";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../store/web3Store";
const { web3provider } = storeToRefs(useWeb3Store());
let quantity = ref("");
let dao = ref({
  name: "",
  address: "",
  token: "",
  tokenAddress: "",
  tokenSymbol: "",
});

const buyTokens = () => {
  const num = Number(quantity.value);

  if (Number.isInteger(num) && num > 0) {
    console.log("TRUE");
  } else {
    console.log("False");
  }
  console.log("buyTokens");
};

const proposals = ref([] as any[]);
onMounted(async () => {
  // getting details
  const route = useRoute();
  const address = route.params.address;
  dao.value.address = address;
  const DAOContract = useDAOContract(address);
  dao.value.name = await DAOContract.name();
  dao.value.tokenAddress = await DAOContract.token();
  const TokenContract = useTokenContract(dao.value.tokenAddress);
  dao.value.token = await TokenContract.name();
  dao.value.tokenSymbol = await TokenContract.symbol();

  const filters = await DAOContract.filters.ProposalCreated();
  const logs = await DAOContract.queryFilter(filters, 26078840, "latest");
  const events = logs.map(log => DAOContract.interface.parseLog(log));
  console.log("EVENTS:", events);
  proposals.value = events.map(e => {
    let obj = {
      title: e.args.description.split("$$")[0],
      description: e.args.description.split("$$")[1],
      proposalId: e.args.proposalId,
    };
    return obj;
  });
  console.log(proposals.value);
});
</script>

<template>
  <div class="h-full">
    <HeaderCard class="flex justify-between items-center">
      <div>
        <h1 class="font-bold text-7xl">{{ dao.name }}</h1>
        <p class="mt-2 text-gray-100">{{ dao.address }}</p>
      </div>
      <div class="bg-teal-700 p-5">
        <div class="flex">
          <p class="text-3xl">
            {{ dao.token }}
          </p>
          <p class="ml-3 text-xl">
            {{ dao.tokenSymbol }}
          </p>
        </div>
        <p>
          {{ dao.tokenAddress }}
        </p>
        <div class="flex items-center">
          <input
            type="text"
            class="max-h-6 text-black"
            v-model="quantity"
            placeholder="Quantity of tokens to buy"
          />
          <button class="ml-2 px-2" @click="buyTokens">Buy</button>
        </div>
      </div>
    </HeaderCard>
    <div class="mx-5 flex justify-between items-center">
      <h1 class="text-xl font-bold">Proposals</h1>
      <div class="mt-5 ml-3">
        <router-link :to="'/create/proposal/' + dao.address">
          <PrimaryButton> Create a proposal </PrimaryButton>
        </router-link>
      </div>
    </div>
    <div
      class="w-screen grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      <ProposalCard
        v-for="proposal in proposals"
        :key="proposal.title"
        :proposalId="proposal.proposalId"
        :dao-address="dao.address"
        class="ml-3"
      >
        <template v-slot:title> {{ proposal.title }} </template>
        <template v-slot:description> {{ proposal.description }} </template>
        <template v-slot:startDate> {{ proposal.startDate }} </template>
        <template v-slot:endDate> {{ proposal.endDate }} </template>
      </ProposalCard>
    </div>
  </div>
</template>
