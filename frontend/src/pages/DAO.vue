<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import HeaderCard from "~/components/HeaderCard.vue";
import {
  useDAOContract,
  useDEXContract,
  useTokenContract,
} from "~/utils/useContract";
import PrimaryButton from "~/components/PrimaryButton.vue";
import ProposalCard from "~/components/ProposalCard.vue";
import { ethers } from "ethers";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../store/web3Store";
import { parseEther } from "@ethersproject/units";
const { web3provider } = storeToRefs(useWeb3Store());

let quantity = ref("");
let dao = ref({
  name: "",
  address: "",
  token: "",
  tokenAddress: "",
  tokenSymbol: "",
});

const buyTokens = async () => {
  const amount = parseEther(quantity.value.toString());
  const dex = useDEXContract();
  const result = await dex.buy(dao.value.tokenAddress, {
    value: amount,
  });
  console.log("Buy transaction started at ", result.hash);
  result.wait(1).then(() => {
    console.log("Buy transaction completed");
  });
};

const proposals = ref([] as any[]);
onMounted(async () => {
  // getting details
  const route = useRoute();
  const address = route.params.address as string;
  dao.value.address = address;
  const DAOContract = useDAOContract(address, true);
  dao.value.name = await DAOContract.name();
  dao.value.tokenAddress = await DAOContract.token();
  const TokenContract = useTokenContract(dao.value.tokenAddress, true);
  dao.value.token = await TokenContract.name();
  dao.value.tokenSymbol = await TokenContract.symbol();

  const filters = await DAOContract.filters.ProposalCreated();
  const logs = await DAOContract.queryFilter(filters);
  const events = logs.map((log: any) => DAOContract.interface.parseLog(log));
  console.log("EVENTS:", events);
  proposals.value = events.map((e: any) => {
    let obj = {
      title: e.args.description.split("$$")[0],
      description: e.args.description.split("$$")[1].substring(0, 50),
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
      <div class="bg-primary-700 p-5 rounded-lg">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl">
            {{ dao.token }}
          </h1>
          <p
            class="ml-3 text-sm bg-white text-primary-600 px-2 py-1 rounded-lg"
          >
            {{ dao.tokenSymbol }}
          </p>
        </div>
        <p class="mt-0.5 text-primary-200 text-sm">
          {{ dao.tokenAddress }}
        </p>
        <div class="mt-2 flex items-center">
          <input
            type="number"
            class="max-h-6 text-white text-sm bg-primary-600 hover:opacity-90 p-2 rounded focus:(outline-none ring-2 ring-primary-500) placeholder-primary-300 transition"
            v-model="quantity"
            placeholder="Amount"
          />
          <button
            class="ml-2 px-2 text-xs bg-primary-600 text-primary-100 px-3.5 py-1 rounded"
            @click="buyTokens"
          >
            Buy
          </button>
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
