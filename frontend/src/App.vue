<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen bg-dark-600 text-white">
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

.fadeonly-enter-active {
  transition: all 0.5s;
}
.fadeonly-leave-active {
  transition: all 0.3s;
}
.fadeonly-enter-from {
  opacity: 0;
  transform: translateY(-2em);
}

.fadeonly-leave-to {
  transform: translateY(1em);
  opacity: 0;
}

input[type="text"] {
  @apply text-white bg-dark-600 hover:bg-dark-500 p-3;
}
</style>
