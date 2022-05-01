<template>
  <div class="m-5 p-10 bg-primary-600 text-white h-50 min-w-30 w-sm">
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
    <div class="mt-3 flex justify-between items-center">
      <button @click="castVote(0)">Against</button>
      <button @click="castVote(1)">For</button>
      <button @click="castVote(2)">Abstain</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDAOContract } from "~/utils/useContract";

const props = defineProps(["proposalId", "daoAddress"]);

const castVote = async (val: number) => {
  const DAOContract = useDAOContract(props.daoAddress);
  const result = await DAOContract.castVote(props.proposalId, val);
  result.wait(1, () => {
    alert("casted vote");
  });
};

onMounted(() => {
  console.log(props.proposalId, props.daoAddress);
});
</script>
