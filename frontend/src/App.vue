<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <Transition name="fade" mode="out-in">
      <router-view />
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-1rem);
}
</style>
