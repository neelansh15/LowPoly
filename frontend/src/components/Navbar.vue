<script setup lang="ts">
import ConnectWalletBtn from "~/components/ConnectWalletBtn.vue";
</script>

<template>
  <nav class="p-5 bg-primary-500 text-white flex justify-between">
    <!-- Left -->
    <div>
      <router-link to="/">
        <h1 class="font-semibold">LowPoly</h1>
      </router-link>
    </div>
    <!-- Right -->
    <div class="text-sm">
      <ConnectWalletBtn />
    </div>
  </nav>
</template>
