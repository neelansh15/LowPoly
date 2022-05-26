<template>
  <div
    class="m-5 from-primary-400 to-primary-600 bg-gradient-to-b text-white rounded-lg"
  >
    <div class="p-5">
      <div class="flex justify-end">
        <p
          style="width: fit-content"
          class="ml-3 text-sm bg-white text-primary-600 px-2 py-1 rounded-lg"
        >
          {{ proposal.status }}
        </p>
      </div>
      <h1 class="text-3xl text-center font-bold">
        <slot name="title"> </slot>
      </h1>
      <p class="text-xl text-center">
        <slot name="description"></slot>
      </p>
      <div class="mt-3 flex justify-between items-center">
        <p class="text-center">
          <slot name="startDate"></slot>
        </p>
        <p class="text-center">
          <slot name="endDate"></slot>
        </p>
      </div>

      <!-- <div class="mt-3 mx-5 flex justify-between items-center">
        <h1>Against</h1>
        <h1>For</h1>
        <h1>Abstain</h1>
      </div> -->
      <div
        class="mt-3 mx-10 text-2xl font-bold flex justify-between items-center"
      >
        <div>
          <h1 class="text-sm font-bold">Against</h1>
          <h2 class="text-xl font-lighttext-xl font-light">
            {{ proposal.against }}
          </h2>
        </div>
        <div>
          <h1 class="text-sm font-bold">For</h1>
          <h2 class="text-xl font-lighttext-xl font-light">
            {{ proposal.for }}
          </h2>
        </div>
        <div>
          <h1 class="text-sm font-bold">Abstain</h1>
          <h2 class="text-xl font-lighttext-xl font-light">
            {{ proposal.abstained }}
          </h2>
        </div>
      </div>
    </div>
    <div
      v-if="proposal.hasVoted"
      class="mt-3 flex justify-between items-center"
    >
      <h1
        class="bg-white p-3 text-primary-500 w-full border-r-3 border-gray-100 rounded-b-lg transition text-center"
      >
        Already Voted
      </h1>
    </div>
    <div
      v-else-if="stateIndex < 2 && userBalance > 0"
      class="mt-3 flex justify-between items-center"
    >
      <button
        class="bg-white p-3 text-primary-500 w-full border-r-3 border-gray-100 rounded-bl-lg hover:(bg-primary-600 text-white) transition"
        @click="castVote(0)"
      >
        Against
      </button>
      <button
        class="bg-white p-3 hover:(bg-primary-600 text-white) text-primary-500 w-full border-r-3 border-gray-100"
        @click="castVote(1)"
      >
        For
      </button>
      <button
        class="bg-white p-3 hover:(bg-primary-600 text-white) text-primary-500 rounded-br-lg w-full"
        @click="castVote(2)"
      >
        Abstain
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useDAOContract, useTokenContract } from "~/utils/useContract";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../store/web3Store";
import { formatEther } from "@ethersproject/units";
import SecondaryButton from "./SecondaryButton.vue";
import PrimaryButton from "./PrimaryButton.vue";
const { address } = storeToRefs(useWeb3Store());
const props = defineProps(["proposalId", "daoAddress"]);
let stateIndex = ref(0);
let userBalance = ref(0);
let proposalStatus = [
  "Pending",
  "Active",
  "Canceled",
  "Defeated",
  "Succeeded",
  "Queued",
  "Expired",
  "Executed",
];
const proposal = reactive({
  hasVoted: false,
  status: proposalStatus[stateIndex.value],
  for: 0,
  against: 0,
  abstained: 0,
});

const castVote = async (val: number) => {
  const DAOContract = useDAOContract(props.daoAddress);
  const result = await DAOContract.castVote(props.proposalId, val, {
    gasLimit: 9023640,
  });
  console.log(result);
  result.wait(1).then(() => {
    alert("Casted vote successfully");
    location.reload();
  });
};

onMounted(async () => {
  const DAOContract = useDAOContract(props.daoAddress, true);
  proposal.hasVoted = await DAOContract.hasVoted(
    props.proposalId,
    address.value,
  );
  stateIndex.value = await DAOContract.state(props.proposalId);
  proposal.status = proposalStatus[stateIndex.value];
  const tokenAddress = await DAOContract.token();
  const TokenContract = useTokenContract(tokenAddress);
  let balance = await TokenContract.balanceOf(address.value);
  userBalance.value = +formatEther(balance.toString());

  const result = await DAOContract.proposalVotes(props.proposalId);
  console.log(result);
  proposal.for = +formatEther(result.forVotes._hex);
  proposal.against = +formatEther(result.againstVotes._hex);
  proposal.abstained = +formatEther(result.abstainVotes._hex);
  await new Promise(r => setTimeout(r, 500));
});
</script>
