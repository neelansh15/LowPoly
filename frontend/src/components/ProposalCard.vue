<template>
  <div class="m-5 p-2 bg-primary-600 text-white h-50 min-w-30 w-sm">
    <div class="text-right mt-0">
      <h1>
        {{ proposal.status }}
      </h1>
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
    <div v-if="proposal.hasVoted" class="mt-3 text-center">
      <h1>Already Voted</h1>
    </div>
    <div
      v-else
      v-if="stateIndex < 2 && userBalance > 0"
      class="mt-3 flex justify-between items-center"
    >
      <button @click="castVote(0)">Against</button>
      <button @click="castVote(1)">For</button>
      <button @click="castVote(2)">Abstain</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useDAOContract, useTokenContract } from "~/utils/useContract";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../store/web3Store";
import { formatEther } from "@ethersproject/units";
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
});

const castVote = async (val: number) => {
  const DAOContract = useDAOContract(props.daoAddress);
  const result = await DAOContract.castVote(props.proposalId, val, {
    gasLimit: 9023640,
  });
  console.log(result);
  result.wait(1, async () => {
    alert("casted vote");
    const result2 = await DAOContract.proposalVotes(props.proposalId);
    console.log(result2);
  });
  const result2 = await DAOContract.proposalVotes(props.proposalId);
  console.log(result2);
};

onMounted(async () => {
  const DAOContract = useDAOContract(props.daoAddress);
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
  await new Promise(r => setTimeout(r, 500));
});
</script>
