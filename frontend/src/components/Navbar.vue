<script setup lang="ts">
import ConnectWalletBtn from './ConnectWalletBtn.vue';</script>

<template>
  <nav class="p-5 bg-primary-600 text-white flex justify-between">
    <!-- Left -->
    <div>
      <h1 class="font-semibold">LowPoly</h1>
    </div>
    <!-- Right -->
    <div class="text-sm">
        <ConnectWalletBtn />
    </div>
  </nav>
</template>
