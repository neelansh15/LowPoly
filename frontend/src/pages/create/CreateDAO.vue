<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
</script>

<template>
  <div>
    <HeaderCard>
      <h1 class="text-7xl font-bold">Create a DAO</h1>
    </HeaderCard>

    <div class="p-10">
      <form @submit.prevent="">
        <input type="text" placeholder="Name" />
        <div class="mt-3 space-x-2">
          <PrimaryButton>Create DAO</PrimaryButton>
          <SecondaryButton type="reset">Reset</SecondaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
