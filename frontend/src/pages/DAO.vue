<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import HeaderCard from "~/components/HeaderCard.vue";
import { useDAOContract, useTokenContract } from "~/utils/useContract";
import PrimaryButton from "~/components/PrimaryButton.vue";
import ProposalCard from "~/components/ProposalCard.vue";

let dao = ref({
  name: "",
  address: "",
  token: "",
  tokenAddress: "",
  tokenSymbol: "",
});
const proposals = ref([] as any[]);
onMounted(async () => {
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
  console.log("FILTERS", filters);
  const logs = await DAOContract.queryFilter(filters, 0, "latest");
  console.log("LOGS", logs);
  const events = logs.map(log => DAOContract.interface.parseLog(log));
  console.log("EVENTS:", events);

  proposals.value = [
    {
      title: "Proposal title",
      description: "test proposal description",
      startDate: "02/02/2022",
      endDate: "15/02/2022",
    },
    {
      title: "Proposal title",
      description: "test proposal description",
      startDate: "02/02/2022",
      endDate: "15/02/2022",
    },
    {
      title: "Proposal title",
      description: "test proposal description",
      startDate: "02/02/2022",
      endDate: "15/02/2022",
    },
    {
      title: "Proposal title",
      description: "test proposal description",
      startDate: "02/02/2022",
      endDate: "15/02/2022",
    },
    {
      title: "Proposal title",
      description: "test proposal description",
      startDate: "02/02/2022",
      endDate: "15/02/2022",
    },
    {
      title: "Proposal title",
      description: "test proposal description",
      startDate: "02/02/2022",
      endDate: "15/02/2022",
    },
  ];
});
</script>

<template>
  <div class="h-full">
    <HeaderCard class="flex justify-between items-center">
      <div>
        <h1 class="font-bold text-7xl">{{ dao.name }}</h1>
        <p class="mt-2 text-gray-100">{{ dao.address }}</p>
      </div>
      <div>
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
      </div>
    </HeaderCard>
    <div class="mx-5 flex justify-between items-center">
      <h1 class="text-xl font-bold">Proposals</h1>
      <div class="mt-5 ml-3">
        <router-link to="/create/proposal">
          <PrimaryButton> Create a proposal </PrimaryButton>
        </router-link>
      </div>
    </div>
    <div class="grid-cols-2">
      <ProposalCard
        v-for="proposal in proposals"
        :key="proposal.title"
        :proposalId="proposal.title"
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
