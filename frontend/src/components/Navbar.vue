<script setup lang="ts">
import ConnectWalletBtn from "~/components/ConnectWalletBtn.vue";
</script>

<template>
  <nav class="p-5 bg-primary-500 text-white flex justify-between">
    <!-- Left -->
    <div>
      <router-link to="/">
        <h1 class="font-bold">LowPoly</h1>
      </router-link>
    </div>
    <!-- Right -->
    <div class="text-sm flex space-x-5 items-center">
      <ul class="flex justify-around items-center list-none space-x-3">
        <li>
          <router-link to="/create/dao"> Create a DAO </router-link>
        </li>
        <li>
          <router-link to="/create/token"> Create a token </router-link>
        </li>
        <li>
          <router-link to="/account"> Account </router-link>
        </li>
      </ul>
      <ConnectWalletBtn />
    </div>
  </nav>
</template>

<style scoped>
li{
  @apply hover:(opacity-80) transition;
}
</style>
