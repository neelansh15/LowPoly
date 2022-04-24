<template>
  <div class="m-5 p-10 bg-primary-600 text-white h-50 min-w-30 max-w-sm">
    <h1 class="text-3xl font-bold">
      <slot name="title" class=""> </slot>
    </h1>
    <h3>
      <slot name="subtitle"></slot>
    </h3>
    <p>
      <slot name="description"></slot>
    </p>
  </div>
</template>
