<template>
  <div
    class="ml-auto p-9 flex flex-col space-y-1.5 bg-gradient-to-br from-primary-400 to-primary-500 hover:(opacity-90) transition-all text-white max-h-50 max-w-auto rounded-lg"
  >
    <h1 class="text-3xl font-bold">
      <slot name="name"></slot>
    </h1>
    <p
      class="text-sm text-primary-500 bg-white rounded-lg px-2.5 py-1"
      style="width: fit-content"
    >
      <slot name="token"></slot>
    </p>
  </div>
</template>
