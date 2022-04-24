<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import { useDAOFactoryContract } from "~/utils/useContract";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../../store/web3Store";
import { reactive } from "vue";
const { address, chainId } = storeToRefs(useWeb3Store());

// pull data for user that is number of votes used and left
// pull data for election that is proposal titles subtitles etc.
// show data on the elections page that is the votes per propposal total votes left in the pool etc

const proposalInfo = reactive({
  title: "",
  subtitle: "",
  description: "",
  proposedMoneyAllocation: "",
});

async function createProposal() {
  console.log(
    proposalInfo.title,
    proposalInfo.subtitle,
    proposalInfo.description,
    proposalInfo.proposedMoneyAllocation,
  );
}
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
          v-model="proposalInfo.subtitle"
          placeholder="Subtitle for proposal"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.description"
          placeholder="Description for proposal"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.proposedMoneyAllocation"
          placeholder="Proposed money allocation"
        />
        <br />
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
