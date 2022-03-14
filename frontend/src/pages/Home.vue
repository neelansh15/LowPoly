<script setup lang="ts">
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
</script>

<template>
  <div class="h-full">
    <HeaderCard>
      <h1 class="font-bold text-7xl">LowPoly</h1>
      <p class="mt-2 text-gray-100">
        Transitioning organizations towards decentralization
      </p>
    </HeaderCard>

    <div class="p-10">
      <router-link to="/create/dao">
        <PrimaryButton> Create a DAO </PrimaryButton>
      </router-link>
      <router-link to="/dao/manage">
        <PrimaryButton> Manage a DAO </PrimaryButton>
      </router-link>
    </div>
  </div>
</template>
