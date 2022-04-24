<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import ProposalCard from "~/components/ProposalCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import { useDAOFactoryContract } from "~/utils/useContract";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../../store/web3Store";
import { reactive } from "vue";
const { address, chainId } = storeToRefs(useWeb3Store());

const proposalInfo = reactive({
  title: "",
  subtitle: "",
  description: "",
  proposedMoneyAllocation: "",
});

// const DAOInfo = reactive({
//   name: "",
// });
// async function createDAO() {
//   const DAOFactoryContract = useDAOFactoryContract();
//   console.log(tokenInfo.address, DAOInfo.name);
//   try {
//     if (DAOFactoryContract) {
//       const result = await DAOFactoryContract.createDAO(
//         DAOInfo.name,
//         tokenInfo.address,
//       );
//       result.wait(1).then(() => {
//         console.log("Done");
//         console.log(DAOFactoryContract.getDAOs());
//       });
//     }
//   } catch (e: any) {
//     console.log(e.message);
//   }
// }

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
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.proposedMoneyAllocation"
          placeholder="Proposed money allocation"
        />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.proposedMoneyAllocation"
          placeholder="Proposed money allocation"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.proposedMoneyAllocation"
          placeholder="Proposed money allocation"
        />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.proposedMoneyAllocation"
          placeholder="Proposed money allocation"
        />

        <div class="mt-3 space-x-2">
          <PrimaryButton type="button" @click="createProposal">
            Create proposal
          </PrimaryButton>
          <SecondaryButton type="reset">Reset</SecondaryButton>
        </div>
      </form>
    </div>
    <ProposalCard>
      <template v-slot:title> {{ proposalInfo.title }} </template>
      <template v-slot:subtitle> {{ proposalInfo.subtitle }} </template>
      <template v-slot:description> {{ proposalInfo.description }} </template>
    </ProposalCard>
  </div>
</template>
