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
      <button>Agree</button>
      <button>Disagree</button>
      <button>Abstain</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps(["proposalId", "daoAddress"]);
onMounted(() => {
  console.log(props.proposalId, props.daoAddress);
});
</script>
