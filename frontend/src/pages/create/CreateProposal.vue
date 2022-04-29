<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../../store/web3Store";
import { ethers } from "ethers";
import { reactive, watch } from "vue";
const { web3provider } = storeToRefs(useWeb3Store());

const proposalInfo = reactive({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  startBlock: "",
  endBlock: "",
});

async function createProposal() {
  console.log(proposalInfo.title, proposalInfo.description);
}

const convertToBlockNumber = async (targetTimestamp: any) => {
  let averageBlockTime = 2.5;
  const provider =
    web3provider || new ethers.providers.Web3Provider(window.ethereum);
  if (!provider) {
    console.log("No provider", provider);
    return null;
  }
  console.log(provider);
  const currentBlockNumber = await provider.value.getBlockNumber();
  let blockNumber = currentBlockNumber;
  let temp = parseInt(
    blockNumber + (targetTimestamp - +new Date() / 1000) / averageBlockTime,
  );
  return temp;
};

watch(
  () => proposalInfo.startDate,
  async (newVal, oldVal) => {
    console.log({ newVal: newVal });
    if (proposalInfo.endDate) {
      if (proposalInfo.startDate > proposalInfo.endDate) {
        alert("Invalid dates");
        proposalInfo.startDate = null;
        return;
      }
    }
    let timeStamp = new Date(newVal).getTime() / 1000;
    let val = await convertToBlockNumber(timeStamp);
    console.log({ val: val });
    if (val) {
      proposalInfo.startBlock = val;
    }
  },
);
watch(
  () => proposalInfo.endDate,
  async (newVal, oldVal) => {
    console.log({ newVal: newVal });
    if (proposalInfo.startDate) {
      if (proposalInfo.startDate > proposalInfo.endDate) {
        alert("Invalid dates");
        proposalInfo.endDate = null;
        return;
      }
    }
    let timeStamp = new Date(newVal).getTime() / 1000;
    let val = await convertToBlockNumber(timeStamp);
    console.log({ val: val });
    if (val) {
      proposalInfo.endBlock = val;
    }
  },
);
</script>

<template>
  <div>
    <HeaderCard>
      <h1 class="text-7xl font-bold">Create a proposal for DAO</h1>
    </HeaderCard>

    <div class="p-10">
      <form @submit.prevent="">
        <b>Fill the details:</b>
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.title"
          placeholder="Title for proposal"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.description"
          placeholder="Description for proposal"
        />
        <br />
        <label class="mr-3" for="startDate">Start date</label>
        <input
          class="mt-3 space-x-2"
          id="startDate"
          type="date"
          v-model="proposalInfo.startDate"
          placeholder="Start date dd/mm/yyyy"
        />
        <label class="ml-3 mr-3" for="endDate">End date</label>
        <input
          class="mt-3 ml-5 space-x-2"
          id="endDate"
          type="date"
          v-model="proposalInfo.endDate"
          placeholder="End date dd/mm/yyyy"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.startBlock"
          placeholder="Start block"
        />
        <input
          class="mt-3 ml-5 space-x-2"
          type="text"
          v-model="proposalInfo.endBlock"
          placeholder="End block"
        />

        <div class="mt-3 space-x-2">
          <PrimaryButton type="button" @click="createProposal">
            Create proposal
          </PrimaryButton>
          <SecondaryButton type="reset">Reset</SecondaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
